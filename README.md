<div align="center">
	<br />
	<p>
		<a href="https://github.com/brinkflew/sharpen/tree/dev#readme"><img src="" width="546" alt="Sharpen" /></a>
	</p>
	<br />
	<p>
		<!-- <a href="https://discord.gg/WJa8u5g"><img src="https://discordapp.com/api/guilds/399609103137112078/embed.png" alt="Discord server" /></a> -->
		<!-- <a href="https://www.npmjs.com/package/discord.js"><img src="https://img.shields.io/npm/v/discord.js.svg?maxAge=3600" alt="NPM version" /></a> -->
		<!-- <a href="https://www.npmjs.com/package/discord.js"><img src="https://img.shields.io/npm/dt/discord.js.svg?maxAge=3600" alt="NPM downloads" /></a> -->
		<a href="https://travis-ci.org/brinkflew/sharpen"><img src="https://travis-ci.com/brinkflew/sharpen.svg?token=SqT9VpUPQCroPxFPU2Yz&branch=master" alt="Build status" /></a>
		<!-- <a href="https://david-dm.org/hydrabolt/discord.js"><img src="https://img.shields.io/david/hydrabolt/discord.js.svg?maxAge=3600" alt="Dependencies" /></a> -->
		<!-- <a href="https://www.patreon.com/discordjs"><img src="https://img.shields.io/badge/donate-patreon-F96854.svg" alt="Patreon" /></a> -->
	</p>
	<!-- <p>
		<a href="https://nodei.co/npm/discord.js/"><img src="https://nodei.co/npm/discord.js.png?downloads=true&stars=true" alt="NPM info" /></a>
	</p> -->
</div>

# About
Sharpen is a framework for creating Discord bots which purpose is to respond to
commands issued in the Discord chatrooms. Sharpen has been developed in
[NodeJS](https://nodejs.org/en/), based on the [Discord.js](https://github.com/discordjs/discord.js)
interface and highly inspired from the [Commando](https://github.com/discordjs/Commando)
and the [Akaïro](https://github.com/1Computer1/discord-akairo) frameworks while
adding a bunch of new features.

## Main Features
- Customizable prefixes per-guild
	(manage different settings per guild or globally, including command prefixes)
- Highly customizable framework
	(YOU decide how your bot will behave)
- Persistent storage of settings in database
	(shipped with built-in SQLite support)
- Almost-automatic translation of messages sent to the chat
	(talk to your bot in French or in English, and switch language anytime with a single command)
- Automatic prompting for invalid command arguments
	(rule #1: never trust the end users)

# Usage
Once deployed and running, the bot will parse messages to find commands to execute.
For the bot to recognized a command, a message should start with the current command
prefix or with a mention to the bot, followed by the command itself.

The `help` command is available to provide more information about the commands the
bot can respond to.

## Examples
Assuming the command prefix is `!`, typing `!ping` in the Discord channel will
trigger the ping command.

Since the prefix is customizable per-guild, it might as well be several characters
long. In that case, the prefix and the command should be separated by a space: `sharp ping`
(assuming the prefix would be `sharp`).

It is also possible to totally disable the prefix, meaning the bot will only respond
if mentioned at the start of the message (that method would always be available,
even if a prefix is set). For instance, `@Sharpbot#1234 ping` will trigger the ping
command.

Last but not least, the bot is also capable of handling direct messages (DMs).
While called in a DM, the bot will automatically try to parse the command even if there
is no prefix and if it's not been mentioned.

## Built-in Commands
A few commands have been pre-registered to speed up your bot's development. However,
your are totally free not to use them or overwrite them in your own project.

### Administration Commands

| Commands | Description                         |
| -------- | ----------------------------------- |
| disable  | Disables a command or command group |
| enable   | Enables a command or command group  |
| groups   | Lists all command groups            |
| load     | Loads a new command                 |
| reload   | Reloads a command or command group  |
| unload   | Unloads a command                   |

### Util Commands

| Commands | Description                                                                            |
| -------- | -------------------------------------------------------------------------------------- |
| eval     | Executes JavaScript code                                                               |
| help     | Displays a list of available commands, or detailed information for a specified command |
| lang     | Shows or sets the current language                                                     |
| ping     | Checks the bot's ping to the Discord server                                            |
| prefix   | Shows or sets the command prefix                                                       |

# Installation
// TODO
