const { oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Décharge une commande.`,
  DETAILS: () =>
    oneLine`
      L'argument doit être le nom complet de la commande dans le format \`group:memberName\`.
      Seuls les propriétaires du bot peuvent utiliser cette commande.
    `,
  PROMPT_COMMAND: () => `Quelle commande voulez-vous décharger ?`,
  UNLOADED: (command, shard) => `La commande \`${command}\` a été déchargée${shard ? ' sur tous les shards' : ''}.`,
  UNLOADED_REPLICATION_FAILED: (command) =>
    `La commande \`${command}\` a été déchargée, mais le déchargement sur les autres shards a échoué.`
};
