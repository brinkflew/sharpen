const { oneLine } = require('common-tags');

/* eslint-disable max-len */

module.exports = {

  // Command information
  DESCRIPTION: () => `Active une commande ou un groupe.`,
  DETAILS: () =>
    oneLine`
      L'argument doit être le nom ou l'ID (partiel ou entier) d'une commande ou d'un groupe de commande.
      Seuls les administrateurs peuvent utiliser cette commande.
    `,

  // Prompts
  PROMPT_CMDORGROUP: () => `Quelle commande ou quel groupe souhaitez-vous activer ?`,

  // Messages
  ALREADY_ENABLED: (args, group) =>
    `${args.cmdOrGrp.group ? 'La commande' : 'Le groupe'} \`${args.cmdOrGrp.name}\` est déjà activé(e).${
      group && !group.enabled ? `, mais le groupe \`${group.name}\` est désactivé, donc elle ne peut toujours pas être utilisée` : ''
    }.`,
  ENABLED: (args, group) =>
    `${args.cmdOrGrp.group ? 'La commande' : 'Le groupe'} \`${args.cmdOrGrp.name}\` a été activé(e).${
      group && !group.enabled ? `, mais le groupe \`${group.name}\` est désactivé, donc elle ne peut toujours pas être utilisée` : ''
    }.`
};
