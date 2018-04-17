const { oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Unloads a command.`,
  DETAILS: () =>
    oneLine`
      The argument must be the name/ID (partial or whole) of a command.
      Only the bot owner(s) may use this command.
    `,
  ARGS_PROMPT_COMMAND: () => `Which command would you like to unload?`,
  UNLOADED: (command, shard) => `Unloaded \`${command}\` command${shard ? ' on all shards' : ''}.`,
  UNLOADED_REPLICATION_FAILED: (command) => `Unloaded \`${command}\` command, but failed to load on other shards.`
};
