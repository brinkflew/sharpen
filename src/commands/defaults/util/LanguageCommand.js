const Command = require('../../Command');

module.exports = class LanguageCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'language',
      group: 'util',
      aliases: [ 'lang' ],
      description: 'CMD_LANG_DESCRIPTION',
      format: '[language/"default"]',
      details: 'CMD_LANG_DETAILS',
      examples: [ 'language', 'language fr', 'language default' ],

      args: [
        {
          key: 'language',
          prompt: 'CMD_LANG_PROMPT_LANGUAGE',
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
    let response;
    if (lowercase === 'default') {
      if (msg.guild) msg.guild.lang = null;
      else this.client.lang = null;
      const current = `\`${this.client.lang}\``;
      response = msg.translate('CMD_LANG_RESET', current);
    } else {
      const lang = lowercase.slice(0, 2);
      if (!this.client.translator.languages.has(lang)) {
        let list = [];
        this.client.translator.languages.map((l) => list.push(`**${l.name} (${l.id})**`));
        response = msg.translate('CMD_LANG_UNKNOWN', lang, list.join(', '));
      } else {
        if (msg.guild) msg.guild.lang = lang;
        else this.client.lang = lang;
        const l = this.client.translator.languages.get(lang);
        response = msg.translate('CMD_LANG_SET', l.name);
      }
    }

    await msg.reply(response);
    return null;
  }
};
