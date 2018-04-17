const { oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Enables a command or command group.`,
  DETAILS: () =>
    oneLine`
      The argument must be the name/ID (partial or whole) of a command or command group.
      Only administrators may use this command.
    `,

  // Prompts
  PROMPT_CMDORGROUP: () => `Which command or group would you like to enable?`,

  // Messages
  ALREADY_ENABLED: (args, group) =>
    `The \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'} is already enabled${
      group && !group.enabled ? `, but the \`${group.name}\` group is disabled, so it still can't be used` : ''
    }.`,
  ENABLED: (args, group) =>
    `Enabled the \`${args.cmdOrGrp.name}\` ${group ? 'command' : 'group'}${
      group && !group.enabled ? `, but the \`${group.name}\` group is disabled, so it still can't be used` : ''
    }.`
};
