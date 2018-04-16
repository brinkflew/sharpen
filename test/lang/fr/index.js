const { stripIndents } = require('common-tags');

module.exports = {
  CMD_TEST_DESCRIPTION: () => `Commande de test pour effectuer des tests`,
  CMD_TEST_SUCCESS: (n1, n2, sum) =>
    stripIndents`
      Deux nombres aléatoires ont été générés: *${n1}* et *${n2}*.
      La somme de ces deux nombres est *${sum}*.
      Le test s'est terminé avec succès, félicitations !
    `,
  CMD_TEST_LOADING: () => `Chargement du test...`
};
