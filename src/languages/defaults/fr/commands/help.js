const { oneLine, stripIndents } = require('common-tags');
const Command = require('../../../../commands/Command');

/* eslint-disable max-len */

module.exports = {

  // Command information
  DESCRIPTION: () => `Affiche une liste des commandes disponibles, ou des informations détaillées sur une commande spécifique.`,
  DETAILS: () =>
    oneLine`
      La commande peut être une partie d'un nom de commande ou un nom de commande complet.
      Si elle n'est pas spécifiée, toutes les commandes disponibles seront listées.
   `,

  // Prompts
  ARGS_PROMPT_COMMAND: () => `Pour quelle commande voulez-vous voir l'aide?`,

  // Command messages
  SENT_DM: () => `Un MP avec des informations vous a été envoyé.`,
  SENT_DM_FAILED: () => `Impossible d'envoyer le MP d'aide. Vous avez probablement désactivé les MPs.`,
  MULTIPLE_RESULTS: () => `Plusieurs commandes trouvées. Merci d'être plus spécifique.`,
  COMMAND: (msg, command) =>
    stripIndents`
      ${oneLine`
        Commande \`${command.name}\`: ${msg.translate(command.description)}
        ${command.guildOnly ? ' (Seulement utilisable dans un serveur)' : ''}
        ${command.nsfw ? ' (NSFW)' : ''}
      `}

      **Format:** ${msg.anyUsage(`${command.name}${command.format ? ` ${command.format}` : ''}`)}
    `,
  COMMAND_ALIASES: (command) => `\n**Alias:** ${command.aliases.join(', ')}`,
  COMMAND_DETAILS: (command, msg) => `\n**Détails:** ${msg.translate(command.details)}`,
  COMMAND_EXAMPLES: (command) => `\n**Exemples:**\n${command.examples.join('\n')}`,
  COMMAND_GROUP: (command) =>
    `\n${oneLine`
      **Groupe:** ${command.group.name}
      (\`${command.groupID}:${command.memberName}\`)
    `}`,
  COMMAND_UNIDENTIFIED: (msg) =>
    oneLine`
      Impossible d'identifier la commande. Utilisez
      ${msg.usage(null, msg.channel.type === 'dm' ? null : undefined, msg.channel.type === 'dm' ? null : undefined)}
      pour voir la liste de toutes les commandes.
    `,
  ALL: (msg, showAll, groups, client, help) =>
    stripIndents`
      ${oneLine`
        Pour exécuter une commande dans ${msg.guild ? msg.guild.name : 'n\'importe quel serveur'},
        utilisez ${Command.usage('command', msg.guild ? msg.guild.commandPrefix : null, client.user)}.
        Par exemple, ${Command.usage('prefix', msg.guild ? msg.guild.commandPrefix : null, client.user)}.
      `}

      Pour exécuter une commande dans ce DM, utilisez simplement ${Command.usage('command', null, null)} sans préfixe.

      Utilisez ${help.usage('<command>', null, null)} pour voir les informations détailées sur une commande.
      Utilisez ${help.usage('all', null, null)} pour voir une liste de *toutes* les commandes, pas seulement celles disponibles.


      **${showAll ? 'Toutes les commandes' : `Commandes disponibles dans ${msg.guild || 'ce DM'}`}**

      ${(showAll ? groups : groups.filter((grp) => grp.commands.some((cmd) => cmd.isUsable(msg))))
    .map((grp) =>
      stripIndents`
        ***${grp.name}***

        ${(showAll ? grp.commands : grp.commands.filter((cmd) => cmd.isUsable(msg)))
    .map((cmd) => `\`${cmd.name}\`  ${msg.translate(cmd.description)}${cmd.nsfw ? ' (NSFW)' : ''}`).join('\n')}`).join('\n\n')}
  `
};
