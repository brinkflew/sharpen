const { oneLine } = require('common-tags');

/* eslint-disable max-len */

module.exports = {

  FORMAT_ERROR: (msg) =>
    oneLine`
      Invalid command usage. The \`${msg.command.name}\` command's accepted format is:
      ${msg.usage(msg.command.format,	msg.guild ? undefined : null,	msg.guild ? undefined : null)}.
      Use ${msg.anyUsage(`help ${msg.command.name}`, msg.guild ? undefined : null, msg.guild ? undefined : null)}
      for more information.
    `
};
