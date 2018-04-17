const { oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Reloads a command or command group.`,
  DETAILS: () =>
    oneLine`
      The argument must be the name/ID (partial or whole) of a command or command group.
      Providing a command group will reload all of the commands in that group.
      Only the bot owner(s) may use this command.
    `,
  PROMPT_COMMAND: () => `Which command or group would you like to reload?`,
  RELOADED_COMMAND_REPLICATION_FAILED: (command) =>
    `Reloaded \`${command}\` command, but failed to reload on other shards.`,
  RELOADED_GROUP_REPLICATION_FAILED: (group) =>
    `Reloaded all of the commands in the \`${group}\` group, but failed to reload on other shards.`,
  RELOADED_COMMAND: (command, shard) =>
    `Reloaded \`${command}\` command${shard ? ' on all shards' : ''}.`,
  RELOADED_GROUP: (group, shard) =>
    `Reloaded all of the commands in the \`${group}\` group${shard ? ' on all shards' : ''}.`,
};
