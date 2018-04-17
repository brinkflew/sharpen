const { stripIndents, oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Montre ou modifie la langue courante.`,
  DETAILS: () =>
    oneLine`
      Si aucune langue n'est fournie, la langue courante est montrée.
      Si la langue est "default", la langue sera réinitialisée à la langue par défaut du bot.
      Seuls les administrateurs peuvent modifier la langue.
    `,

  // Prompts
  PROMPT_LANGUAGE: () => `Quelle langue voudriez-vous que le bot parle ?`,

  // Messages
  CURRENT: (lang) =>
    stripIndents`
      La langue courante est ${lang.name}.
    `,
  SET: (lang) => `La langue a été changée vers \`${lang}\`.`,
  RESET: (current) => `La langue a été réinitialisée à sa valeur par défaut (avant : ${current}).`,
  ADMIN_ONLY: () => `Seuls les administrateurs peuvent modifier la langue.`,
  OWNER_ONLY: () => `Seuls les propriétaires du bot peuvent modifier la langue par défaut.`
};
