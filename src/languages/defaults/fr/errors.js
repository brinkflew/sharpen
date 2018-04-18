const { oneLine, stripIndents } = require('common-tags');

module.exports = {

  // Restrictions
  OWNER_ONLY: (command) => `La commande \`${command.name}\` ne peut être utilisée que par le propriétaire du bot.`,
  SERVER_ONLY: (command) => `La commande \`${command.name}\` doit être utilisée dans un canal de serveur.`,
  NSFW_ONLY: (command) => `La commande \`${command.name}\` ne peut être utilisée que dans un canal NSFW.`,

  // Permissions
  USER_PERMISSION: (command) => `Vous n'avez pas la permission d'utiliser la commande \`${command.name}\`.`,
  CLIENT_PERMISSION: (command, permission) =>
    `J'ai besoin de la permission "${permission}" pour que la commande \`${command.name}\` fonctionne.`,
  CLIENT_PERMISSIONS: (command, permissions, missing) =>
    oneLine`
      J'ai besoin des permissions suivantes pour que la commande \`${command.name}\` fonctionne :
      ${missing.map((perm) => permissions[perm]).join(', ')}
    `,
  MISSING_PERMISSION: (command, permission) =>
    `La commande \`${command.name}\` nécessite que vous ayez la permission "${permission}".`,
  MISSING_PERMISSIONS: (command, permissions, missing) =>
    oneLine`
      La commande \`${command.name}\` nécessite que vous ayez les permissions suivantes :
      ${missing.map((perm) => permissions[perm]).join(', ')}
    `,

  // Throttling
  THROTTLED: (command, time) =>
    `Vous ne pouvez plus utiliser la commande \`${command.name}\` pendant encore ${time.toFixed(1)} secondes.`,

  // Other errors
  UNKNOWN_ERROR: (usage) => `Commande inconnue. Utilisez ${usage} pour voir la liste de toutes les commandes.`,
  UNEXPECTED_ERROR: (error, ownerList, invite) =>
    stripIndents`
      Une erreur est survenue en exécutant la commande : \`${error.name}: ${error.message}\`
      Vous ne devriez jamais recevoir une erreur comme celle-ci.
      Veuillez contacter ${ownerList || 'le propriétaire du bot'}${invite ? ` dans ce serveur : ${invite}` : '.'}
    `,
  FORMAT_ERROR: (msg) =>
    oneLine`
      Utilisation de commande invalide. Le format accepté pour la commande \`${msg.command.name}\` est :
      ${msg.usage(msg.command.format,	msg.guild ? undefined : null,	msg.guild ? undefined : null)}.
      Utilisez ${msg.anyUsage(`help ${msg.command.name}`, msg.guild ? undefined : null, msg.guild ? undefined : null)}
      pour plus d'informations.
    `
};
