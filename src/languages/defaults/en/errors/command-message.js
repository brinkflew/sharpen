const { oneLine, stripIndents } = require('common-tags');

module.exports = {
  SERVER_ONLY: (command) => `The \`${command.name}\` command must be used in a server channel.`,
  NSFW_ONLY: (command) => `The \`${command.name}\` command can only be used in NSFW channels.`,
  USER_PERMISSIONS: (command) => `You do not have permission to use the \`${command.name}\` command.`,
  CLIENT_PERMISSION: (command, permission) => `I need the "${permission}" permission for the \`${command.name}\` command to work.`,
  CLIENT_PERMISSIONS: (command, permissions, missing) =>
    oneLine`
      I need the following permissions for the \`${command.name}\` command to work:
      ${missing.map((perm) => permissions[perm]).join(', ')}
    `,
  THROTTLED: (command, time) => `You may not use the \`${command.name}\` command again for another ${time.toFixed(1)} seconds.`,
  UNEXPECTED_ERROR: (error, ownerList, invite) =>
    stripIndents`
      An error occurred while running the command: \`${error.name}: ${error.message}\`
      You shouldn't ever receive an error like this.
      Please contact ${ownerList || 'the bot owner'}${invite ? ` in this server: ${invite}` : '.'}
    `
};
