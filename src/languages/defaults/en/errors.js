const { oneLine, stripIndents } = require('common-tags');

module.exports = {

  // Restrictions
  OWNER_ONLY: (command) => `The \`${command.name}\` command can only be used by the bot owner.`,
  SERVER_ONLY: (command) => `The \`${command.name}\` command must be used in a server channel.`,
  NSFW_ONLY: (command) => `The \`${command.name}\` command can only be used in NSFW channels.`,

  // Permissions
  USER_PERMISSION: (command) => `You do not have permission to use the \`${command.name}\` command.`,
  CLIENT_PERMISSION: (command, permission) =>
    `I need the "${permission}" permission for the \`${command.name}\` command to work.`,
  CLIENT_PERMISSIONS: (command, permissions, missing) =>
    oneLine`
      I need the following permissions for the \`${command.name}\` command to work:
      ${missing.map((perm) => permissions[perm]).join(', ')}
    `,
  MISSING_PERMISSION: (command, permission) =>
    `The \`${command.name}\` command requires you to have the "${permission}" permission.`,
  MISSING_PERMISSIONS: (command, permissions, missing) =>
    oneLine`
      The \`${command.name}\` command requires you to have the following permissions:
      ${missing.map((perm) => permissions[perm]).join(', ')}
    `,

  // Throttling
  THROTTLED: (command, time) =>
    `You may not use the \`${command.name}\` command again for another ${time.toFixed(1)} seconds.`,

  // Other errors
  UNKNOWN_ERROR: (usage) => `Unknown command. Use ${usage} to view the list of all commands.`,
  UNEXPECTED_ERROR: (error, ownerList, invite) =>
    stripIndents`
      An error occurred while running the command: \`${error.name}: ${error.message}\`
      You shouldn't ever receive an error like this.
      Please contact ${ownerList || 'the bot owner'}${invite ? ` in this server: ${invite}` : '.'}
    `,
  FORMAT_ERROR: (msg) =>
    oneLine`
      Invalid command usage. The \`${msg.command.name}\` command's accepted format is:
      ${msg.usage(msg.command.format,	msg.guild ? undefined : null,	msg.guild ? undefined : null)}.
      Use ${msg.anyUsage(`help ${msg.command.name}`, msg.guild ? undefined : null, msg.guild ? undefined : null)}
      for more information.
    `
};
