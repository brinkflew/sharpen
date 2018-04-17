const { oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Charge une nouvelle commande.`,
  DETAILS: () =>
    oneLine`
      L'argument doit être le nom complet de la commande dans le format \`group:memberName\`.
      Seuls les propriétaires du bot peuvent utiliser cette commande.
    `,
  PROMPT_COMMAND: () => `Quelle commande voulez-vous charger ?`,
  LOADED: (command, shard) => `La commande \`${command}\` a été chargée${shard ? ' sur tous les shards' : ''}.`,
  LOADED_REPLICATION_FAILED: (command) =>
    `La commande \`${command}\` a été chargée, mais le chargement sur les autres shards a échoué.`,
  ALREADY_REGISTERED: () => `Cette commande est déjà enregistrée.`
};
