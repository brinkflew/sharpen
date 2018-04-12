const { stripIndents } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Lists all command groups.`,
  DETAILS: () => `Only administrators may use this command.`,

  // Messages
  LIST: (groups, msg) =>
    stripIndents`
      **Groups**
      ${groups.map((grp) =>
    `\`${grp.name}\` ${grp.isEnabledIn(msg.guild) ? 'Enabled' : 'Disabled'}`).join('\n')}
    `
};
