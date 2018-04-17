const Command = require('../../Command');

module.exports = class UnloadCommandCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'unload',
      aliases: [ 'unload-command' ],
      group: 'admin',
      memberName: 'unload',
      description: 'CMD_UNLOAD_DESCRIPTION',
      details: 'CMD_UNLOAD_DETAILS',
      examples: [ 'unload some-command' ],
      ownerOnly: true,
      guarded: true,

      args: [
        {
          key: 'command',
          prompt: 'CMD_UNLOAD_ARGS_PROMPT_COMMAND',
          type: 'command'
        }
      ]
    });
  }

  async run(msg, args) {
    args.command.unload();

    if (this.client.shard) {
      try {
        await this.client.shard.broadcastEval(`
					if (this.shard.id !== ${this.client.shard.id}) this.registry.commands.get('${args.command.name}').unload();
				`);
      } catch (err) {
        this.client.emit('warn', `Error when broadcasting command unload to other shards`);
        this.client.emit('error', err);
        await msg.reply(msg.translate('CMD_UNLOAD_UNLOADED_REPLICATION_FAILED', args.command.name));
        return null;
      }
    }

    await msg.reply(msg.translate('CMD_UNLOAD_UNLOADED', args.command.name, this.client.shard));
    return null;
  }
};
