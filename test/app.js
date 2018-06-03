/* eslint-disable no-console, max-len */

const sharpen = require('../src');
const path = require('path');
const sqlite = require('sqlite');
const config = require('./config');
const { TOKEN, DATABASE, OWNERS } = process.env;

const client = new sharpen.Client({
  owner: OWNERS ? OWNERS.split(',') : config.owner,
  commandPrefix: 'sdev'
});

client
  .on('error', console.error)
  .on('warn', console.warn)
  .on('debug', console.log)
  .on('ready', () => {
    console.log(
      `Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
  })
  .on('disconnect', () => {
    console.warn('Disconnected!');
  })
  .on('reconnecting', () => {
    console.warn('Reconnecting...');
  })
  .on('commandError', (cmd, err) => {
    if (err instanceof sharpen.FriendlyError) return;
    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
  })
  .on('commandBlocked', (msg, reason) => {
    console.log(
      `Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''} \
			blocked; ${reason}`
    );
  })
  .on('commandPrefixChange', (guild, prefix) => {
    console.log(
      `Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`} \
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`
    );
  })
  .on('commandStatusChange', (guild, command, enabled) => {
    console.log(
      `Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`
    );
  })
  .on('groupStatusChange', (guild, group, enabled) => {
    console.log(
      `Group ${group.id} ${enabled ? 'enabled' : 'disabled'} ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`
    );
  })
  .on('languageChange', (guild, lang) => {
    console.log(
      `Language set to ${lang} ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`
    );
  });

client.setProvider(
  sqlite.open(path.join(__dirname, DATABASE || 'database.sqlite3'))
    .then((db) => new sharpen.SQLiteProvider(db))
).catch(console.error);

client.registry
  .registerDefaults()
  .registerGroup('test', 'Testing')
  .registerGroup('math', 'Math')
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.translator
  .registerDefaults()
  .registerStringsFrom(path.join(__dirname, 'lang/en'), 'en')
  .registerStringsFrom(path.join(__dirname, 'lang/fr'), 'fr');

client.login(TOKEN || config.token);

/* eslint-enable no-console */
