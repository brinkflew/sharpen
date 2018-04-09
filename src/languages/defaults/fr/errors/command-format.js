const { oneLine } = require('common-tags');

/* eslint-disable max-len */

module.exports = {

  FORMAT_ERROR: (msg) =>
    oneLine`
      Utilisation de commande invalide. Le format accepté pour la commande \`${msg.command.name}\` est :
      ${msg.usage(msg.command.format,	msg.guild ? undefined : null,	msg.guild ? undefined : null)}.
      Utilisez ${msg.anyUsage(`help ${msg.command.name}`, msg.guild ? undefined : null, msg.guild ? undefined : null)}
      pour plus d'informations.
    `
};
