const Command = require('../../Command');
const { disambiguation } = require('../../../utils');

module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      group: 'util',
      aliases: [ 'commands' ],
      description: 'CMD_HELP_DESCRIPTION',
      details: 'CMD_HELP_DETAILS',
      examples: [ 'help', 'help prefix' ],
      guarded: true,

      args: [
        {
          key: 'command',
          prompt: 'CMD_HELP_PROMPT_COMMAND',
          type: 'string',
          default: ''
        }
      ]
    });
  }

  async run(msg, args) { // eslint-disable-line complexity
    const groups = this.client.registry.groups;
    const commands = this.client.registry.findCommands(args.command, false, msg);
    const showAll = args.command && args.command.toLowerCase() === 'all';

    if (args.command && !showAll) {
      if (commands.length === 1) {
        let help = msg.translate('CMD_HELP_COMMAND', msg, commands[0]);
        if (commands[0].aliases.length > 0) help += msg.translate('CMD_HELP_COMMAND_ALIASES', commands[0]);
        help += msg.translate('CMD_HELP_COMMAND_GROUP', commands[0]);
        if (commands[0].details) help += msg.translate('CMD_HELP_COMMAND_DETAILS', commands[0], msg);
        if (commands[0].examples) help += msg.translate('CMD_HELP_COMMAND_EXAMPLES', commands[0], msg);

        const messages = [];
        try {
          messages.push(await msg.direct(help));
          if (msg.channel.type !== 'dm') messages.push(await msg.reply(msg.translate('CMD_HELP_SENT_DM')));
        } catch (err) {
          messages.push(await msg.reply(msg.translate('CMD_HELP_SENT_DM_FAILED')));
        }
        return messages;
      } else if (commands.length > 15) {
        return msg.reply(msg.translate('CMD_HELP_MULTIPLE_RESULTS'));
      } else if (commands.length > 1) {
        return msg.reply(disambiguation(commands, 'commands'));
      } else {
        return msg.reply(msg.translate('CMD_HELP_COMMAND_UNIDENTIFIED', msg));
      }
    } else {
      const messages = [];
      try {
        messages.push(
          await msg.direct(
            msg.translate('CMD_HELP_ALL', msg, showAll, groups, this.client, this), { split: true }
          )
        );
        if (msg.channel.type !== 'dm') messages.push(await msg.reply(msg.translate('CMD_HELP_SENT_DM')));
      } catch (err) {
        messages.push(await msg.reply(msg.translate('CMD_HELP_SENT_DM_FAILED')));
      }
      return messages;
    }
  }
};
