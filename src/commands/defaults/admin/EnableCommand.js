const Command = require('../../Command');

module.exports = class EnableCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'enable',
      aliases: [ 'enable-command', 'cmd-on', 'command-on' ],
      group: 'admin',
      description: 'CMD_ENABLE_DESCRIPTION',
      details: 'CMD_ENABLE_DETAILS',
      examples: [ 'enable util', 'enable Utility', 'enable prefix' ],
      guarded: true,

      args: [
        {
          key: 'cmdOrGrp',
          label: 'command/group',
          prompt: 'CMD_ENABLE_PROMPT_CMDORGROUP',
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
    const group = args.cmdOrGrp.group;
    if (args.cmdOrGrp.isEnabledIn(msg.guild, true)) {
      return msg.reply(msg.translate('CMD_ENABLE_ALREADY_ENABLED', args, group));
    }
    args.cmdOrGrp.setEnabledIn(msg.guild, true);
    return msg.reply(msg.translate('CMD_ENABLE_ENABLED', args, group));
  }
};
