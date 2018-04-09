const { stripIndents } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Exécute du code JavaScript.`,
  DETAILS: () => `Seuls les propriétaires du bot peuvent utiliser cette commande.`,

  // Prompts
  ARGS_PROMPT_SCRIPT: () => `Quel code voulez-vous évaluer ?`,

  // Messages
  CALLBACK: (hrDiff, inspected) =>
    stripIndents`
      *Callback exécuté après ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
      \`\`\`javascript
      ${inspected}
      \`\`\`
    `,
  RESULT: (editable, hrDiff, inspected, input) =>
    stripIndents`
      ${editable ? `
          *Entrée*
          \`\`\`javascript
          ${input}
          \`\`\`` : ''}
      *Exécuté en ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
      \`\`\`javascript
      ${inspected}
      \`\`\`
    `,

  // Error messages
  EVALUATION_ERROR: (err) => `Erreur lors de l'évaluation : \`${err}\``,
  CALLBACK_ERROR: (val) => `Erreur de callback : \`${val}\``,
};
