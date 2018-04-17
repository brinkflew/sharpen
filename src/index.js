module.exports = {
  Client: require('./Client'),
  SharpenClient: require('./Client'),
  GuildExtension: require('./extensions/GuildExtension'),
  ExtendedGuild: require('./extensions/GuildExtension'),
  SharpenGuild: require('./extensions/GuildExtension'),
  Command: require('./commands/Command'),
  CommandGroup: require('./commands/CommandGroup'),
  CommandMessage: require('./commands/CommandMessage'),
  CommandRegistry: require('./commands/CommandRegistry'),
  CommandDispatcher: require('./commands/CommandDispatcher'),
  Argument: require('./arguments/Argument'),
  ArgumentType: require('./arguments/ArgumentType'),
  ArgumentCollector: require('./arguments/ArgumentCollector'),
  Language: require('./languages/Language'),
  LanguageRegistry: require('./languages/LanguageRegistry'),
  LanguageString: require('./languages/LanguageString'),
  FriendlyError: require('./errors/FriendlyError'),
  CommandFormatError: require('./errors/CommandFormatError'),

  util: require('./utils'),
  pagination: require('./utils/pagination'),
  escapeRegex: require('./utils/escape-regex'),
  disambiguation: require('./utils/disambiguation'),
  permissions: require('./utils/constants/permissions'),
  version: require('../package').version,

  SettingsProvider: require('./providers/SettingsProvider'),
  get SQLiteProvider() {
    return require('./providers/SQLiteProvider');
  }
};

/**
 * @external Channel
 * @see {@link https://discord.js.org/#/docs/main/master/class/Channel}
 */
/**
 * @external Client
 * @see {@link https://discord.js.org/#/docs/main/master/class/Client}
 */
/**
 * @external ClientOptions
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/ClientOptions}
 */
/**
 * @external Collection
 * @see {@link https://discord.js.org/#/docs/main/master/class/Collection}
 */
/**
 * @external DMChannel
 * @see {@link https://discord.js.org/#/docs/main/master/class/DMChannel}
 */
/**
 * @external GroupDMChannel
 * @see {@link https://discord.js.org/#/docs/main/master/class/GroupDMChannel}
 */
/**
 * @external Guild
 * @see {@link https://discord.js.org/#/docs/main/master/class/Guild}
 */
/**
 * @external GuildMember
 * @see {@link https://discord.js.org/#/docs/main/master/class/GuildMember}
 */
/**
 * @external GuildResolvable
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/GuildResolvable}
 */
/**
 * @external Message
 * @see {@link https://discord.js.org/#/docs/main/master/class/Message}
 */
/**
 * @external MessageAttachment
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageAttachment}
 */
/**
 * @external MessageEmbed
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageEmbed}
 */
/**
 * @external MessageReaction
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageReaction}
 */
/**
 * @external MessageOptions
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/MessageOptions}
 */
/**
 * @external Role
 * @see {@link https://discord.js.org/#/docs/main/master/class/Role}
 */
/**
 * @external StringResolvable
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/StringResolvable}
 */
/**
 * @external TextChannel
 * @see {@link https://discord.js.org/#/docs/main/master/class/TextChannel}
 */
/**
 * @external User
 * @see {@link https://discord.js.org/#/docs/main/master/class/User}
 */
/**
 * @external UserResolvable
 * @see {@link https://discord.js.org/#/docs/main/master/class/UserResolvable}
 */
/**
 * @external Emoji
 * @see {@link https://discord.js.org/#/docs/main/master/class/Emoji}
 */
/**
 * @external ReactionEmoji
 * @see {@link https://discord.js.org/#/docs/main/master/class/ReactionEmoji}
 */
/**
 * @external Webhook
 * @see {@link https://discord.js.org/#/docs/main/master/class/Webhook}
 */
/**
 * @external MessageEmbed
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageEmbed}
 */
/**
 * @external ShardingManager
 * @see {@link https://discord.js.org/#/docs/main/master/class/ShardingManager}
 */
/**
 * @external RequireAllOptions
 * @see {@link https://www.npmjs.com/package/require-all}
 */
