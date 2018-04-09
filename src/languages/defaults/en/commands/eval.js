const { stripIndents } = require('common-tags');

module.exports = {

  // Command information
  DESCRIPTION: () => `Executes JavaScript code.`,
  DETAILS: () => `Only the bot owner(s) may use this command.`,

  // Prompts
  ARGS_PROMPT_SCRIPT: () => `What code would you like to evaluate?`,

  // Messages
  CALLBACK: (hrDiff, inspected) =>
    stripIndents`
      *Callback executed after ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
      \`\`\`javascript
      ${inspected}
      \`\`\`
    `,
  RESULT: (editable, hrDiff, inspected, input) =>
    stripIndents`
      ${editable ? `
          *Input*
          \`\`\`javascript
          ${input}
          \`\`\`` : ''}
      *Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
      \`\`\`javascript
      ${inspected}
      \`\`\`
    `,

  // Error messages
  EVALUATION_ERROR: (err) => `Error while evaluating: \`${err}\``,
  CALLBACK_ERROR: (val) => `Callback error: \`${val}\``,
};
