const fs = require('fs');
const Command = require('../../Command');

module.exports = class LoadCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'load',
      aliases: [ 'load-command' ],
      group: 'admin',
      description: 'CMD_LOAD_DESCRIPTION',
      details: 'CMD_LOAD_DETAILS',
      examples: [ 'load some-command' ],
      ownerOnly: true,
      guarded: true,

      args: [
        {
          key: 'command',
          prompt: 'CMD_LOAD_ARGS_PROMPT_COMMAND',
          validate: (val) => new Promise((resolve) => {
            if (!val) return resolve(false);
            const split = val.split(':');
            if (split.length !== 2) return resolve(false);
            if (this.client.registry.findCommands(val).length > 0) {
              return resolve('CMD_LOAD_ALREADY_REGISTERED');
            }
            const cmdPath = this.client.registry.resolveCommandPath(split[0], split[1]);
            fs.access(cmdPath, fs.constants.R_OK, (err) => err ? resolve(false) : resolve(true));
            return null;
          }),
          parse: (val) => {
            const split = val.split(':');
            const cmdPath = this.client.registry.resolveCommandPath(split[0], split[1]);
            delete require.cache[cmdPath];
            return require(cmdPath);
          }
        }
      ]
    });
  }

  async run(msg, args) {
    this.client.registry.registerCommand(args.command);
    const command = this.client.registry.commands.last();

    if (this.client.shard) {
      try {
        await this.client.shard.broadcastEval(`
					if(this.shard.id !== ${this.client.shard.id}) {
						const cmdPath = this.registry.resolveCommandPath('${command.groupID}', '${command.name}');
						delete require.cache[cmdPath];
						this.registry.registerCommand(require(cmdPath));
					}
				`);
      } catch (err) {
        this.client.emit('warn', `Error when broadcasting command load to other shards`);
        this.client.emit('error', err);
        await msg.reply(msg.translate('CMD_LOAD_LOADED_REPLICATION_FAILED', command.name));
        return null;
      }
    }

    await msg.reply(msg.translate('CMD_LOAD_LOADED', command.name, this.client.shard));
    return null;
  }
};
