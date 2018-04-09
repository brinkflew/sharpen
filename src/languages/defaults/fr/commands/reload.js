const { oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Charge une commande ou un groupe de commandes.`,
  DETAILS: () =>
    oneLine`
    L'argument doit être le nom complet de la commande dans le format \`group:memberName\` ou un groupe de commande.
    Fournir un groupe de commandes rchargera toutes les commandes de ce groupe.
    Seuls les propriétaires du bot peuvent utiliser cette commande.
    `
};
