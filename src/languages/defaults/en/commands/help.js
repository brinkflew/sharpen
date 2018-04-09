const { oneLine, stripIndents } = require('common-tags');
const Command = require('../../../../commands/Command');

/* eslint-disable max-len */

module.exports = {

  // Command information
  DESCRIPTION: () => `Displays a list of available commands, or detailed information for a specified command.`,
  DETAILS: () =>
    oneLine`
     The command may be part of a command name or a whole command name.
     If it isn't specified, all available commands will be listed.
   `,

  // Prompts
  ARGS_PROMPT_COMMAND: () => `Which command would you like to view the help for?`,

  // Command messages
  SENT_DM: () => `Sent you a DM with information.`,
  SENT_DM_FAILED: () => `Unable to send you the help DM. You probably have DMs disabled.`,
  MULTIPLE_RESULTS: () => `Multiple commands found. Please be more specific.`,
  COMMAND: (msg, command) =>
    stripIndents`
    ${oneLine`
      Command \`${command.name}\`: ${msg.translate(command.description)}
      ${command.guildOnly ? ' (Usable only in servers)' : ''}
      ${command.nsfw ? ' (NSFW)' : ''}
      `}

      **Format:** ${msg.anyUsage(`${command.name}${command.format ? ` ${command.format}` : ''}`)}
    `,
  COMMAND_ALIASES: (command) => `\n**Aliases:** ${command.aliases.join(', ')}`,
  COMMAND_DETAILS: (command, msg) => `\n**Details:** ${msg.translate(command.details)}`,
  COMMAND_EXAMPLES: (command) => `\n**Examples:**\n${command.examples.join('\n')}`,
  COMMAND_GROUP: (command) =>
    `\n${oneLine`
      **Group:** ${command.group.name}
      (\`${command.groupID}:${command.memberName}\`)
    `}`,
  COMMAND_UNIDENTIFIED: (msg) =>
    oneLine`
      Unable to identify command. Use
      ${msg.usage(null, msg.channel.type === 'dm' ? null : undefined, msg.channel.type === 'dm' ? null : undefined)}
      to view the list of all commands.
    `,
  ALL: (msg, showAll, groups, client, help) =>
    stripIndents`
      ${oneLine`
        To run a command in ${msg.guild ? msg.guild.name : 'any server'},
        use ${Command.usage('command', msg.guild ? msg.guild.commandPrefix : null, client.user)}.
        For example, ${Command.usage('prefix', msg.guild ? msg.guild.commandPrefix : null, client.user)}.
      `}

      To run a command in this DM, simply use ${Command.usage('command', null, null)} with no prefix.

      Use ${help.usage('<command>', null, null)} to view detailed information about a specific command.
      Use ${help.usage('all', null, null)} to view a list of *all* commands, not just available ones.


      **${showAll ? 'All commands' : `Available commands in ${msg.guild || 'this DM'}`}**

      ${(showAll ? groups : groups.filter((grp) => grp.commands.some((cmd) => cmd.isUsable(msg))))
    .map((grp) =>
      stripIndents`
        ***${grp.name}***

        ${(showAll ? grp.commands : grp.commands.filter((cmd) => cmd.isUsable(msg)))
    .map((cmd) => `\`${cmd.name}\`  ${msg.translate(cmd.description)}${cmd.nsfw ? ' (NSFW)' : ''}`).join('\n')}`).join('\n\n')}
  `
};
