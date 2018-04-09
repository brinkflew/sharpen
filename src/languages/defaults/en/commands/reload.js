const { oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Reloads a command or command group.`,
  DETAILS: () =>
    oneLine`
      The argument must be the name/ID (partial or whole) of a command or command group.
      Providing a command group will reload all of the commands in that group.
      Only the bot owner(s) may use this command.
    `
};
