const Command = require('../../Command');

module.exports = class ReloadCommandCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'reload',
      aliases: [ 'reload-command' ],
      group: 'admin',
      memberName: 'reload',
      description: 'CMD_RELOAD_DESCRIPTION',
      details: 'CMD_RELOAD_DETAILS',
      examples: [ 'reload some-command' ],
      ownerOnly: true,
      guarded: true,

      args: [
        {
          key: 'cmdOrGrp',
          label: 'command/group',
          prompt: 'CMD_RELOAD_ARGS_PROMPT_COMMAND',
          type: 'group|command'
        }
      ]
    });
  }

  async run(msg, args) {
    const { cmdOrGrp } = args;
    const isCmd = Boolean(cmdOrGrp.groupID);
    cmdOrGrp.reload();

    if (this.client.shard) {
      try {
        await this.client.shard.broadcastEval(`
					if(this.shard.id !== ${this.client.shard.id}) {
						this.registry.${isCmd ? 'commands' : 'groups'}.get('${isCmd ? cmdOrGrp.name : cmdOrGrp.id}').reload();
					}
				`);
      } catch (err) {
        this.client.emit('warn', `Error when broadcasting command reload to other shards`);
        this.client.emit('error', err);
        if (isCmd) {
          await msg.reply(msg.translate('CMD_RELOAD_RELOADED_COMMAND_REPLICATION_FAILED', cmdOrGrp.name));
        } else {
          await msg.reply(msg.translate('CMD_RELOAD_RELOADED_GROUP_REPLICATION_FAILED', cmdOrGrp.name));
        }
        return null;
      }
    }

    if (isCmd) {
      await msg.reply(msg.translate('CMD_RELOAD_RELOADED_COMMAND', cmdOrGrp.name, this.client.shard));
    } else {
      await msg.reply(msg.translate('CMD_RELOAD_RELOADED_GROUP', cmdOrGrp.name, this.client.shard));
    }
    return null;
  }
};
