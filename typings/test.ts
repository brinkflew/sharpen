/// <reference path='index.d.ts' />

import { Message } from 'discord.js';
import { Command, CommandMessage, Client } from 'sharpen';

const client =  new Client({ unknownCommandResponse: true });

client.on('message', (message: Message) => {
  if (message.content === 'SYN') message.channel.send('ACK');
});

class TestCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'test',
      group: 'test',
      memberName: 'test',
      description: 'Test'
    });
  }

  public hasPermission(message: CommandMessage): boolean {
    return true;
  }

  public async run(message: CommandMessage, args: {} | string | string[]): Promise<Message | Message[]> {
    return message.say('TEST');
  }
}

client.login('');
