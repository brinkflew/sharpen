const { stripIndents, oneLine } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Shows or sets the current language.`,
  DETAILS: () =>
    oneLine`
      If no language is provided, the current language will be shown.
      If the language is "default", the language will be reset to the bot's default language.
      Only administrators may change the language.
    `,

  // Prompts
  PROMPT_LANGUAGE: () => `What would you like to set the bot's language to?`,

  // Messages
  CURRENT: (lang) =>
    stripIndents`
      The current language is ${lang.name}.
    `,
  SET: (lang) => `Set the language to \`${lang}\`.`,
  RESET: (current) => `Reset the language to its default (currently ${current}).`,
  ADMIN_ONLY: () => `Only administrators may change the language.`,
  OWNER_ONLY: () => `Only the bot owner(s) may change the global language.`
};
