const { oneLine } = require('common-tags');

module.exports = {
  OWNER_ONLY: (command) => `La commande \`${command.name}\` ne peut être utilisée que par le propriétaire du bot.`,
  MISSING_ONE: (command, permission) => `La commande \`${command.name}\` nécessite que vous ayez la permission "${permission}".`,
  MISSING_LIST: (command, permissions, missing) =>
    oneLine`
      La commande \`${command.name}\` nécessite que vous ayez les permissions suivantes :
      ${missing.map((perm) => permissions[perm]).join(', ')}
    `
};
