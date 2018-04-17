const { oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Charge une commande ou un groupe de commandes.`,
  DETAILS: () =>
    oneLine`
      L'argument doit être le nom complet de la commande dans le format \`group:memberName\` ou un groupe de commande.
      Fournir un groupe de commandes rchargera toutes les commandes de ce groupe.
      Seuls les propriétaires du bot peuvent utiliser cette commande.
    `,
  PROMPT_COMMAND: () => `Quelle commande ou groupe voulez-vous recharger ?`,
  RELOADED_COMMAND_REPLICATION_FAILED: (command) =>
    `La commande \`${command}\` a été rechargée, mais le rechargement sur les autres shards a échoué.`,
  RELOADED_GROUP_REPLICATION_FAILED: (group) =>
    oneLine`
      Toutes les commandes dans le groupe \`${group}\` ont été rechargées,
      mais le rechargement sur les autres shards a échoué.
    `,
  RELOADED_COMMAND: (command, shard) =>
    `La commande \`${command}\` a été rechargée${shard ? ' sur tous les shards' : ''}.`,
  RELOADED_GROUP: (group, shard) =>
    `Toutes les commandes dans le groupe \`${group}\` ont été rechargées${shard ? ' sur tous les shards' : ''}.`,
};
