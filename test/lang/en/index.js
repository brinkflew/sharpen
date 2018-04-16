const { stripIndents } = require('common-tags');

module.exports = {
  CMD_TEST_DESCRIPTION: () => `Test command to perform tests`,
  CMD_TEST_SUCCESS: (n1, n2, sum) =>
    stripIndents`
      Generated two random numbers: *${n1}* and *${n2}*.
      The sum of these two numbers is *${sum}*.
      Test ran successfuly, congrats!
    `,
  CMD_TEST_LOADING: () => `Loading test...`
};
