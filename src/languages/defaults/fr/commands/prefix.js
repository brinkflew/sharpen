const { stripIndents, oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Montre ou modifie le préfixe des commandes.`,
  DETAILS: () =>
    oneLine`
      Si aucun préfixe n'est fourni, le préfixe courant est montré.
      Si le préfixs est "default", le préfixe sera réinitialisé au préfixe par défaut du bot.
      Si le préfixe est "none", le préfixe sera complètement désactivé, seules les mentions seront disponibles pour exécuter des commandes.
      Seuls les administrateurs peuvent modifier le préfixe.
    `,

  // Prompts
  ARGS_PROMPT_PREFIX: () => `Quel préfixe voudriez-vous que le bot utilise ?`,

  // Messages
  CURRENT: (msg, prefix) =>
    stripIndents`
      ${prefix ? `Le préfixe est \`${prefix}\`.` : 'Il n\'y a pas de préfixe.'}
      Pour exécuter des commandes, utilisez ${msg.anyUsage('command')}.
    `,
  SET: (prefix) => `Le préfixe est changé pour \`${prefix}\`.`,
  RESET: (current) => `Le préfixe a été réinitialisé à sa valeur par défaut (avant : ${current}).`,
  REMOVED: () => `Le préfixe a été supprimé.`,
  HINT: (msg, response) => `${response} Pour exécuter des commandes, utilisez ${msg.anyUsage('command')}.`,
  ADMIN_ONLY: () => `Seuls les administrateurs peuvent modifier le préfixe.`,
  OWNER_ONLY: () => `Seuls les propriétaires du bot peuvent modifier le préfixe par défaut.`
};
