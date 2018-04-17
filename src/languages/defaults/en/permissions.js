const { oneLine } = require('common-tags');

module.exports = {
  OWNER_ONLY: (command) => `The \`${command.name}\` command can only be used by the bot owner.`,
  MISSING_ONE: (command, permission) => `The \`${command.name}\` command requires you to have the "${permission}" permission.`,
  MISSING_LIST: (command, permissions, missing) =>
    oneLine`
      The \`${command.name}\` command requires you to have the following permissions:
      ${missing.map((perm) => permissions[perm]).join(', ')}
    `
};
