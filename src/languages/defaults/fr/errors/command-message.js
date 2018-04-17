const { oneLine, stripIndents } = require('common-tags');

module.exports = {
  SERVER_ONLY: (command) => `La commande \`${command.name}\` doit être utilisée dans un canal de serveur.`,
  NSFW_ONLY: (command) => `La commande \`${command.name}\` ne peut être utilisée que dans un canal NSFW.`,
  USER_PERMISSIONS: (command) => `Vous n'avez pas la permission d'utiliser la commande \`${command.name}\`.`,
  CLIENT_PERMISSION: (command, permission) => `J'ai besoin de la permission "${permission}" pour que la commande \`${command.name}\` fonctionne.`,
  CLIENT_PERMISSIONS: (command, permissions, missing) =>
    oneLine`
      J'ai besoin des permissions suivantes pour que la commande \`${command.name}\` fonctionne :
      ${missing.map((perm) => permissions[perm]).join(', ')}
    `,
  THROTTLED: (command, time) => `Vous ne pouvez plus utiliser la commande \`${command.name}\` pendant encore ${time.toFixed(1)} secondes.`,
  UNEXPECTED_ERROR: (error, ownerList, invite) =>
    stripIndents`
      Une erreur est survenue en exécutant la commande : \`${error.name}: ${error.message}\`
      Vous ne devriez jamais recevoir une erreur comme celle-ci.
      Veuillez contacter ${ownerList || 'le propriétaire du bot'}${invite ? ` dans ce serveur : ${invite}` : '.'}
    `
};
