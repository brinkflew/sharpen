const Command = require('../../../src/commands/Command');

class TestCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'test',
      group: 'test',
      memberName: 'test',
      description: 'CMD_TEST_DESCRIPTION',
      throttling: {
        usages: 2,
        duration: 5
      }
    });
  }

  async run(msg) {
    msg.reply(msg.translate('CMD_TEST_SUCCESS'));
  }
}

module.exports = TestCommand;
