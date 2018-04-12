const Command = require('../../Command');

module.exports = class LanguageCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'language',
      group: 'util',
      memberName: 'language',
      aliases: [ 'lang' ],
      description: 'CMD_LANG_DESCRIPTION',
      format: '[language/"default"]',
      details: 'CMD_LANG_DETAILS',
      examples: [ 'language', 'language fr', 'language default' ],

      args: [
        {
          key: 'language',
          prompt: 'CMD_LANG_ARGS_PROMPT_LANGUAGE',
          type: 'string',
          max: 15,
          default: ''
        }
      ]
    });
  }

  async run(msg, args) {
    // Just output the language
    if (!args.language) {
      let lang = msg.guild ? msg.guild.lang : this.client.lang;
      lang = this.client.translator.languages.get(lang);
      return msg.reply(msg.translate('CMD_LANG_CURRENT', lang));
    }

    // Check the user's permission before changing anything
    if (msg.guild) {
      if (!msg.member.hasPermission('ADMINISTRATOR') && !this.client.isOwner(msg.author)) {
        return msg.reply(msg.translate('CMD_LANG_ADMIN_ONLY'));
      }
    } else if (!this.client.isOwner(msg.author)) {
      return msg.reply(msg.translate('CMD_LANG_OWNER_ONLY'));
    }

    // Save the language
    const lowercase = args.language.toLowerCase();
    const lang = lowercase.slice(0, 2);
    let response;
    if (lowercase === 'default') {
      if (msg.guild) msg.guild.lang = null;
      else this.client.lang = null;
      const current = `\`${this.client.lang}\``;
      response = msg.translate('CMD_LANG_RESET', current);
    } else {
      if (msg.guild) msg.guild.lang = lang;
      else this.client.lang = lang;
      response = msg.translate('CMD_LANG_SET', args.language);
    }

    await msg.reply(response);
    return null;
  }
};
