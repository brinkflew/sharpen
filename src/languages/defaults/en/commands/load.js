const { oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Loads a new command.`,
  DETAILS: () =>
    oneLine`
      The argument must be full name of the command in the format of \`group:memberName\`.
      Only the bot owner(s) may use this command.
    `,
  PROMPT_COMMAND: () => `Which command would you like to load?`,
  LOADED: (command, shard) => `Loaded \`${command}\` command${shard ? ' on all shards' : ''}.`,
  LOADED_REPLICATION_FAILED: (command) => `Loaded \`${command}\` command, but failed to load on other shards.`,
  ALREADY_REGISTERED: () => `That command is already registered.`
};
