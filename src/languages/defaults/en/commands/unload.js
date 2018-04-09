const { oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Unloads a command.`,
  DETAILS: () =>
    oneLine`
      The argument must be the name/ID (partial or whole) of a command.
      Only the bot owner(s) may use this command.
    `,
};
