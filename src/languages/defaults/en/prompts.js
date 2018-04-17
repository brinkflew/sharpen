const { oneLine } = require('common-tags');

module.exports = {
  INVALID_ARG: (label) => `You provided an invalid ${label}. Please try again.`,
  CANCEL: (waiting, time) =>
    oneLine`
      Respond with \`cancel\` to cancel the command.
      ${waiting ? `The command will automatically be cancelled in ${time} seconds.` : ''}
    `,
  CANCELLED: () => `Cancelled command.`,
  INFINITE_INVALID_ARG: (label, escaped) =>
    oneLine`
      You provided an invalid ${label},
      "${escaped.length < 1850 ? escaped : '[too long to show]'}".
      Please try again.
    `,
  INFINITE_CANCEL: (waiting, time) =>
    oneLine`
      Respond with \`cancel\` to cancel the command, or \`finish\` to finish entry.
      ${waiting ? `The command will automatically be cancelled in ${time} seconds, unless you respond.` : ''}
    `,
};
