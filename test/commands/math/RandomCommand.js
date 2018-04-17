const { Command } = require('../../../src');

class RandomCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'random',
      group: 'math',
      aliases: [ 'rand', 'random-number' ],
      description: 'CMD_RANDOM_DESCRIPTION',
      details: 'CMD_RANDOM_DETAILS',
      examples: [ 'rand 35', 'random 10 112' ],

      args: [
        {
          key: 'max',
          label: 'number',
          prompt: 'CMD_RANDOM_PROMPT_BOUNDARY',
          type: 'float'
        },
        {
          key: 'min',
          label: 'number',
          prompt: 'CMD_RANDOM_PROMPT_BOUNDARY',
          type: 'float',
          default: 0
        },
      ]
    });
  }

  run(msg, args) {
    let min = Math.floor(parseFloat(args.min));
    let max = Math.floor(parseFloat(args.max));

    if (max < min) {
      const tmp = max;
      max = min;
      min = tmp;
    }

    const number = Math.floor((Math.random() * (max - min)) + min);
    return msg.reply(msg.translate('CMD_RANDOM_RESULT', number, min, max));
  }
}

module.exports = RandomCommand;
