const Command = require('../../Command');

module.exports = class DisableCommandCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'disable',
      aliases: [ 'disable-command', 'cmd-off', 'command-off' ],
      group: 'admin',
      memberName: 'disable',
      description: 'CMD_DISABLE_DESCRIPTION',
      details: 'CMD_DISABLE_DETAILS',
      examples: [ 'disable util', 'disable Utility', 'disable prefix' ],
      guarded: true,

      args: [
        {
          key: 'cmdOrGrp',
          label: 'command/group',
          prompt: 'CMD_DISABLE_ARGS_PROMPT_CMDORGROUP',
          type: 'group|command'
        }
      ]
    });
  }

  hasPermission(msg) {
    if (!msg.guild) return this.client.isOwner(msg.author);
    return msg.member.hasPermission('ADMINISTRATOR') || this.client.isOwner(msg.author);
  }

  run(msg, args) {
    if (!args.cmdOrGrp.isEnabledIn(msg.guild, true)) {
      return msg.reply(msg.translate('CMD_DISABLE_ALREADY_DISABLED', args));
    }
    if (args.cmdOrGrp.guarded) {
      return msg.reply(msg.translate('CMD_DISABLE_NOT_ALLOWED', args));
    }
    args.cmdOrGrp.setEnabledIn(msg.guild, false);
    return msg.reply(msg.translate('CMD_DISABLE_DISABLED', args));
  }
};
