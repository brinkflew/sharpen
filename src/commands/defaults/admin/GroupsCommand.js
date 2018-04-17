const Command = require('../../Command');

module.exports = class GroupsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'groups',
      aliases: [ 'list-groups', 'show-groups' ],
      group: 'admin',
      description: 'CMD_GROUPS_DESCRIPTION',
      details: 'CMD_GROUPS_DETAILS',
      guarded: true
    });
  }

  hasPermission(msg) {
    if (!msg.guild) return this.client.isOwner(msg.author);
    return msg.member.hasPermission('ADMINISTRATOR') || this.client.isOwner(msg.author);
  }

  run(msg) {
    return msg.reply(msg.translate('CMD_GROUPS_LIST', this.client.registry.groups, msg));
  }
};
