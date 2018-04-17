const { Command } = require('../../../src');

class SumCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'sum',
      group: 'math',
      aliases: [ 'add', 'add-numbers', 'sum-numbers' ],
      description: 'CMD_SUM_DESCRIPTION',
      details: 'CMD_SUM_DETAILS',
      examples: [ 'sum 1337 42', 'add-numbers 1 2 3 4 5' ],

      args: [
        {
          key: 'numbers',
          label: 'number',
          prompt: 'CMD_SUM_PROMPT_NUMBERS',
          type: 'float',
          infinite: true
        }
      ]
    });
  }

  run(msg, args) {
    const total = args.numbers.reduce((prev, arg) => prev + parseFloat(arg), 0);
    return msg.reply(`${args.numbers.join(' + ')} = **${total}**`);
  }
}

module.exports = SumCommand;
