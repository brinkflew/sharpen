const { stripIndents } = require('common-tags');

/* eslint-disable max-len */

module.exports = {

  // TEST command
  CMD_TEST_DESCRIPTION: () => `Commande de test pour effectuer des tests.`,
  CMD_TEST_LOADING: () => `Chargement du test...`,
  CMD_TEST_SUCCESS: (n1, n2, sum) =>
    stripIndents`
      Deux nombres aléatoires ont été générés: *${n1}* et *${n2}*.
      La somme de ces deux nombres est *${sum}*.
      Le test s'est terminé avec succès, félicitations !
    `,

  // SUM command
  CMD_SUM_DESCRIPTION: () => `Aditionne des nombres ensembles.`,
  CMD_SUM_DETAILS: () => `Cette commande extraordinaire trouve la somme totale d'un ensemble de nombres.`,
  CMD_SUM_PROMPT_NUMBERS: () => `Quels nombres voulez-vous aditionner ? Chaque message que vous enverrez sera interprété comme un nombre unique.`,

  // RANDOM command
  CMD_RANDOM_DESCRIPTION: () => `Renvoye un nombre aléatoire.`,
  CMD_RANDOM_DETAILS: () => `Trouve un nombre, choisi aléatoirement, compris entre deux bornes.`,
  CMD_RANDOM_PROMPT_BOUNDARY: () => `Quelle valeur maximale voudriez-vous que la commande renvoye ?`,
  CMD_RANDOM_RESULT: (number, min, max) => `Le dé a roulé et s'est arrêté sur la valeur magique de **${number}**, comprise entre **${min}** et **${max}**.`
};

/* eslint-enable max-len */
