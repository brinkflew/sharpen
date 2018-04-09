const { oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Charge une nouvelle commande.`,
  DETAILS: () =>
    oneLine`
      L'argument doit être le nom complet de la commande dans le format \`group:memberName\`.
      Seuls les propriétaires du bot peuvent utiliser cette commande.
    `
};
