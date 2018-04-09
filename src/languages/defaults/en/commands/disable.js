const { oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Disables a command or command group.`,
  DETAILS: () =>
    oneLine`
      The argument must be the name/ID (partial or whole) of a command or command group.
      Only administrators may use this command.
    `,

  // Prompts
  ARGS_PROMPT_CMDORGROUP: () => `Which command or group would you like to disable?`,

  // Messages
  DISABLED: (args) =>
    `Disabled the \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'}.`,
  ALREADY_DISABLED: (args) =>
    `The \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'} is already disabled.`,
  NOT_ALLOWED: (args) =>
    `You cannot disable the \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'}.`
};
