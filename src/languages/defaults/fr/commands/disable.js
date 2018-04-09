const { oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Désactive une commande ou un groupe de commandes.`,
  DETAILS: () =>
    oneLine`
      L'argument doit être le nom ou l'ID (partiel ou entier) d'une commande ou d'un groupe de commande.
      Seuls les administrateurs peuvent utiliser cette commande.
    `,

  // Prompts
  ARGS_PROMPT_CMDORGROUP: () => `Quelle commande ou quel groupe souhaitez-vous désactiver ?`,

  // Messages
  DISABLED: (args) =>
    `${args.cmdOrGrp.group ? 'La commande' : 'Le groupe'} \`${args.cmdOrGrp.name}\` a été désactivé(e).`,
  ALREADY_DISABLED: (args) =>
    `${args.cmdOrGrp.group ? 'La commande' : 'Le groupe'} \`${args.cmdOrGrp.name}\` est déjà désactivé(e).`,
  NOT_ALLOWED: (args) =>
    `Vous ne pouvez pas désactiver ${args.cmdOrGrp.group ? 'la commande' : 'le groupe'} \`${args.cmdOrGrp.name}\`.`
};
