const { stripIndents } = require('common-tags');

/* eslint-disable max-len */

module.exports = {

  // TEST command
  CMD_TEST_DESCRIPTION: () => `Test command to perform tests.`,
  CMD_TEST_LOADING: () => `Loading test...`,
  CMD_TEST_SUCCESS: (n1, n2, sum) =>
    stripIndents`
      Generated two random numbers: *${n1}* and *${n2}*.
      The sum of these two numbers is *${sum}*.
      Test ran successfuly, congrats!
    `,

  // SUM command
  CMD_SUM_DESCRIPTION: () => `Adds numbers together.`,
  CMD_SUM_DETAILS: () => `This is an incredibly useful command that finds the sum of a set of numbers.`,
  CMD_SUM_PROMPT_NUMBERS: () => `What numbers would you like to add? Every message you send will be interpreted as a single number.`,

  // RANDOM command
  CMD_RANDOM_DESCRIPTION: () => `Returns a random number.`,
  CMD_RANDOM_DETAILS: () => `Finds a random number comprised between two boundaries.`,
  CMD_RANDOM_PROMPT_BOUNDARY: () => `What is the maximum value you would like the command to return?`,
  CMD_RANDOM_RESULT: (number, min, max) => `The dice rolled and stopped on the magical value of **${number}**, which is comprised between **${min}** and **${max}**.`
};

/* eslint-enable max-len */
