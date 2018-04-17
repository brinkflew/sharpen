const { oneLine } = require('common-tags');

module.exports = {
  INVALID_ARG: (label) => `Vous avez fourni un argument invalide (type attendu : *${label}*). Veuillez réessayer.`,
  CANCEL: (waiting, time) =>
    oneLine`
      Répondez \`cancel\` pour annuler la commande.
      ${waiting ? `La commande sera automatiquement annulée dans ${time} secondes.` : ''}
    `,
  CANCELLED: () => `Commande annulée.`,
  INFINITE_INVALID_ARG: (label, escaped) =>
    oneLine`
      Vous avez fourni un argument invalide (type attendu : *${label}*),
      "${escaped.length < 1850 ? escaped : '[trop long pour être affiché]'}".
      Veuillez réessayer.
    `,
  INFINITE_CANCEL: (waiting, time) =>
    oneLine`
      Répondez \`cancel\` pour annuler la commande, ou \`finish\` pour terminer l'entrée.
      ${waiting ? `La commande sera automatiquement annulée dans ${time} secondes, à moins que vous ne répondiez.` : ''}
    `,
};
