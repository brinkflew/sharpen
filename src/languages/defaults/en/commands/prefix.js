const { stripIndents, oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Shows or sets the command prefix.`,
  DETAILS: () =>
    oneLine`
      If no prefix is provided, the current prefix will be shown.
      If the prefix is "default", the prefix will be reset to the bot's default prefix.
      If the prefix is "none", the prefix will be removed entirely, only allowing mentions to run commands.
      Only administrators may change the prefix.
    `,

  // Prompts
  ARGS_PROMPT_PREFIX: () => `What would you like to set the bot's prefix to?`,

  // Messages
  CURRENT: (msg, prefix) =>
    stripIndents`
      ${prefix ? `The command prefix is \`${prefix}\`.` : 'There is no command prefix.'}
      To run commands, use ${msg.anyUsage('command')}.
    `,
  SET: (prefix) => `Set the command prefix to \`${prefix}\`.`,
  RESET: (current) => `Reset the command prefix to the default (currently ${current}).`,
  REMOVED: () => `Removed the command prefix entirely.`,
  HINT: (msg, response) => `${response} To run commands, use ${msg.anyUsage('command')}.`,
  ADMIN_ONLY: () => `Only administrators may change the command prefix.`,
  OWNER_ONLY: () => `Only the bot owner(s) may change the global command prefix.`
};
