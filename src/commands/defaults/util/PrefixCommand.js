const Command = require('../../Command');

module.exports = class PrefixCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'prefix',
      group: 'util',
      memberName: 'prefix',
      description: 'CMD_PREFIX_DESCRIPTION',
      format: '[prefix/"default"/"none"]',
      details: 'CMD_PREFIX_DETAILS',
      examples: [ 'prefix', 'prefix -', 'prefix omg!', 'prefix default', 'prefix none' ],

      args: [
        {
          key: 'prefix',
          prompt: 'CMD_PREFIX_ARGS_PROMPT_PREFIX',
          type: 'string',
          max: 15,
          default: ''
        }
      ]
    });
  }

  async run(msg, args) {
    // Just output the prefix
    if (!args.prefix) {
      const prefix = msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix;
      return msg.reply(msg.translate('CMD_PREFIX_CURRENT', msg, prefix));
    }

    // Check the user's permission before changing anything
    if (msg.guild) {
      if (!msg.member.hasPermission('ADMINISTRATOR') && !this.client.isOwner(msg.author)) {
        return msg.reply(msg.translate('CMD_PREFIX_ADMIN_ONLY'));
      }
    } else if (!this.client.isOwner(msg.author)) {
      return msg.reply(msg.translate('CMD_PREFIX_OWNER_ONLY'));
    }

    // Save the prefix
    const lowercase = args.prefix.toLowerCase();
    const prefix = lowercase === 'none' ? '' : args.prefix;
    let response;
    if (lowercase === 'default') {
      if (msg.guild) msg.guild.commandPrefix = null; else this.client.commandPrefix = null;
      const current = this.client.commandPrefix ? `\`${this.client.commandPrefix}\`` : 'no prefix';
      response = msg.translate('CMD_PREFIX_RESET', current);
    } else {
      if (msg.guild) msg.guild.commandPrefix = prefix; else this.client.commandPrefix = prefix;
      response = prefix ? msg.translate('CMD_PREFIX_SET', args.prefix) : msg.translate('CMD_PREFIX_REMOVED');
    }

    await msg.reply(msg.translate('CMD_PREFIX_HINT', msg, response));
    return null;
  }
};
