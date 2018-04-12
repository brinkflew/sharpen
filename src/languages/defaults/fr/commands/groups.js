const { stripIndents } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Liste toutes les commandes et leurs groupes.`,
  DETAILS: () => `Seuls les administrateurs peuvent utiliser cette commande.`,

  // Messages
  LIST: (groups, msg) =>
    stripIndents`
      **Groupes**
      ${groups.map((grp) =>
    `\`${grp.name}\` ${grp.isEnabledIn(msg.guild) ? 'Activé' : 'Désactivé'}`).join('\n')}
    `
};
