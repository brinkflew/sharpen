const { oneLine } = require('common-tags');

/* eslint-disable max-len */

module.exports = {

  DESCRIPTION: () => `Checks the bot's ping to the Discord server.`,
  PINGING: () => `Pinging...`,
  RESPONSE_IMMUTABLE: (msg, pingMsg, ping) =>
    oneLine`
      ${msg.channel.type !== 'dm' ? `${msg.author},` : ''}
      Pong! The message round-trip took ${pingMsg.createdTimestamp - msg.createdTimestamp}ms.
      ${ping ? `The heartbeat ping is ${Math.round(ping)}ms.` : ''}
    `,
  RESPONSE_EDITABLE: (msg, ping) =>
    oneLine`
      Pong! The message round-trip took ${msg.editedTimestamp - msg.createdTimestamp}ms.
      ${ping ? `The heartbeat ping is ${Math.round(ping)}ms.` : ''}
    `,
};
