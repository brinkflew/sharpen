const { oneLine } = require('common-tags');

/* eslint-disable max-len */

module.exports = {

  DESCRIPTION: () => `Vérifie le ping du bot vers le serveur Discord.`,
  PINGING: () => `Ping...`,
  RESPONSE_IMMUTABLE: (msg, pingMsg, ping) =>
    oneLine`
      ${msg.channel.type !== 'dm' ? `${msg.author},` : ''}
      Pong! Le message aller-retour a prit ${pingMsg.createdTimestamp - msg.createdTimestamp}ms.
      ${ping ? `Le ping heartbeat est de ${Math.round(ping)}ms.` : ''}
    `,
  RESPONSE_EDITABLE: (msg, ping) =>
    oneLine`
      Pong! Le message aller-retour a prit ${msg.editedTimestamp - msg.createdTimestamp}ms.
      ${ping ? `Le ping heartbeat est de ${Math.round(ping)}ms.` : ''}
    `
};
