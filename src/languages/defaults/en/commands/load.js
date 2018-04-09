const { oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Loads a new command.`,
  DETAILS: () =>
    oneLine`
      The argument must be full name of the command in the format of \`group:memberName\`.
      Only the bot owner(s) may use this command.
    `
};
