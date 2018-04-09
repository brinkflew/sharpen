const { stripIndents } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Liste toutes les commandes et leurs groupes.`,
  DETAILS: () => `Seuls les administrateurs peuvent utiliser cette commande.`,

  // Messages
  LIST: (msg) =>
    stripIndents`
      __**Groupes**__
      ${this.client.registry.groups.map((grp) =>
    `**${grp.name}:** ${grp.isEnabledIn(msg.guild) ? 'Activé' : 'Désactivé'}`).join('\n')}
    `
};
