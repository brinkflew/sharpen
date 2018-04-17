const Command = require('../../../src/commands/Command');

class TestCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'test',
      group: 'test',
      description: 'CMD_TEST_DESCRIPTION',
      throttling: {
        usages: 2,
        duration: 5
      }
    });
  }

  async run(msg) {
    const testMsg = await msg.reply(msg.translate('CMD_TEST_LOADING'));
    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 10);
    const add = n1 + n2;
    return testMsg.edit(msg.translate('CMD_TEST_SUCCESS', n1, n2, add));
  }
}

module.exports = TestCommand;
