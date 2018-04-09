const Command = require('../../Command');

class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      group: 'ping',
      memberName: 'ping',
      description: 'CMD_PING_DESCRIPTION',
      throttling: {
        usages: 2,
        duration: 5
      }
    });
  }

  async run(msg) {
    if (!msg.editable) {
      const pingMsg = await msg.reply(msg.translate('CMD_PING_PINGING'));
      return pingMsg.edit(
        msg.translate(
          'CMD_PING_RESPONSE_IMMUTABLE',
          msg,
          pingMsg,
          this.client.ping
        )
      );
    } else {
      await msg.edit(msg.translate('CMD_PING_PINGING'));
      return msg.edit(
        msg.translate(
          'CMD_PING_RESPONSE_EDITABLE',
          msg,
          this.client.ping
        )
      );
    }
  }
}

module.exports = PingCommand;
