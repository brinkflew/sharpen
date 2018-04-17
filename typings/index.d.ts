declare module 'sqlite' {
  export interface Database {}
  export interface Statement {}
}

declare module 'sharpen' {
  import { Channel, Client as DiscordClient, ClientOptions as DiscordClientOptions, ClientUserSettings, Collection, DMChannel, Emoji, GroupDMChannel, Guild, GuildChannel, GuildMember, GuildResolvable, Message, MessageAttachment, MessageEmbed, MessageMentions, MessageOptions, MessageReaction, PermissionResolvable, ReactionEmoji, Role, Snowflake, StringResolvable, TextChannel, User, UserResolvable, Webhook } from 'discord.js';
  import { Database as SQLiteDatabase, Statement as SQLiteStatement } from 'sqlite';

  // ====================
  // Argument
  // ====================

  type ArgumentDefault = any|Function;

	type ArgumentInfo = {
		key: string;
		label?: string;
		prompt: string;
		error?: string;
		type?: string;
		max?: number;
		min?: number;
		oneOf?: any[];
		default?: any|Function;
		infinite?: boolean;
		validate?: Function;
		parse?: Function;
    isEmpty: Function;
		wait?: number;
	};

  type ArgumentResult = {
		value: any|any[];
		cancelled?: 'user'|'time'|'promptLimit';
		prompts: Message[];
		answers: Message[];
	};

  export class Argument {

    public constructor(client: Client, info: ArgumentInfo);

    public key: string;
    public label: string;
    public prompt: string;
    public error: string;
    public type: ArgumentType;
    public max: number;
    public min: number;
    public default: ArgumentDefault;
    public oneOf: string[];
    public infinite: boolean;
    public validator: Function;
    public parser: Function;
    public emptyChecker: Function;
    public wait: number;

    public obtain(msg: CommandMessage, val?: string, promptLimit?: number): Promise<ArgumentResult>;
    public validate(val: string, msg: CommandMessage): boolean|string|Promise<boolean|string>;
    public parse(val: string, msg: CommandMessage): any|Promise<any>;
    public isEmpty(val: string, msg: CommandMessage): boolean;

    private obtainInfinite(msg: CommandMessage, vals?: string[], promptLimit?: number): Promise<ArgumentResult>;

    private static validateInfo(client: Client, info: ArgumentInfo);
    private static determineType(client: Client, id: string): ArgumentType;
  }

  // ====================
  // ArgumentCollector
  // ====================

  type ArgumentCollectorResult = {
		values?: object;
		cancelled?: 'user'|'time'|'promptLimit';
		prompts: Message[];
		answers: Message[];
	};

  export class ArgumentCollector {

    public constructor(client: Client, args: ArgumentInfo, promptLimit: number);

    public args: Argument[];
    public promptLimit: number;

    public obtain(msg: CommandMessage, provided?: any[], promptLimit?: number): Promise<ArgumentCollectorResult>;
  }

  // ====================
  // ArgumentType
  // ====================

  export abstract class ArgumentType {

    public constructor(client: Client, id: string);

    public id: string;

    abstract validate(val: string, msg: CommandMessage, arg: Argument): boolean|string|Promise<boolean|string>;
    abstract parse(val: string, msg: CommandMessage, arg: Argument): any|Promise<any>;

    public isEmpty(val: string, msg: CommandMessage, arg: Argument): boolean;
  }

  // ====================
  // Command
  // ====================

  type ThrottlingOptions = {
		usages: number;
		duration: number;
  };

	type CommandInfo = {
		name: string;
		aliases?: string[];
		autoAliases?: boolean;
		group: string;
		memberName: string;
		description: string;
		format?: string;
		details?: string;
		examples?: string[];
		nsfw?: boolean;
		guildOnly?: boolean;
		ownerOnly?: boolean;
		clientPermissions?: PermissionResolvable[];
		userPermissions?: PermissionResolvable[];
		defaultHandling?: boolean;
		throttling?: ThrottlingOptions;
		args?: ArgumentInfo[];
		argsPromptLimit?: number;
		argsType?: 'single'|'multiple';
		argsCount?: number;
		argsSingleQuotes?: boolean;
		patterns?: RegExp[];
		guarded?: boolean;
	};

  export class Command {

    public constructor(client: Client, info: CommandInfo);

    public name: string;
    public aliases: string[];
    public groupID: string;
    public group?: CommandGroup;
    public membername: string;
    public description: string;
    public format: string;
    public details?: string;
    public examples?: string[];
    public guildOnly: boolean;
    public ownerOnly: boolean;
    public clientPermissions?: PermissionResolvable[];
    public userPermissions?: PermissionResolvable[];
    public nsfw: boolean;
    public defaultHandling: boolean;
    public throttling?: ThrottlingOptions;
    public argsCollector?: ArgumentCollector;
    public argsType: string;
    public argsCount: number;
    public argsSingleQuotes: boolean;
    public patterns: RegExp[];
    public guarded: boolean;
    private _globalEnabled: boolean;
    private _throttles: boolean;

    public hasPermission(message: CommandMessage, ownerOverride: boolean): boolean|string;
    public run(message: CommandMessage, args: object|string|string[], fromPattern: boolean): Promise<Message|Message[]>;
    public setEnabledIn(guild: GuildResolvable, enabled: boolean);
    public isEnabledIn(guild: GuildResolvable, bypassGroup?: boolean): boolean;
    public isUsable(message: Message): boolean;
    public usage(argString?: string, prefix?: string, user?: User): string;
    public reload();
    public unload();

    private throttle(userID: string): object;

    public static usage(command: string, prefix?: string, user?: User): string;

    private static validateInfo(client: Client, info: CommandInfo);
  }

  // ====================
  // CommandDispatcher
  // ====================

  type Inhibitor = (msg: CommandMessage) => false|string|[string, Promise<Message>];

  export class CommandDispatcher {

    public constructor(client: Client, registry: CommandRegistry);

    public registry: CommandRegistry;
    public inhibitors: Set<Function>;
    private _commandPatterns: object;
    private _results: Map<string, CommandMessage>;
    private _awaiting: Set<string>;

    public addInhibitor(inhibitor: Inhibitor): boolean;
    public removeInhibitor(inhibitor: Inhibitor): boolean;

    private handleMessage(message: Message, oldMessage: Message): Promise<void>;
    private shouldHandleMessage(message: Message, oldMessage: Message): boolean;
    private inhibit(cmdMsg: CommandMessage): string[];
    private cacheCommandMessage(message: Message, oldMessage: Message, cmdMsg: CommandMessage, responses: Message|Message[]);
    private parseMessage(message: Message): CommandMessage;
    private matchDefault(message: Message, pattern: RegExp, commandNameIndex: number): CommandMessage;
    private buildCommandPattern(prefix?: string): RegExp;
  }

  // ====================
  // CommandGroup
  // ====================

  export class CommandGroup {

    public constructor(client: Client, id: string, name?: string, guarded?: boolean);

    public id: string;
    public name: string;
    public commands: Collection<string, Command>;
    public guarded: boolean;
    private _globalEnabled: boolean;

    public setEnabledIn(guild: GuildResolvable, enabled: boolean);
    public isEnabledIn(guild: GuildResolvable): boolean;
    public reload();
  }

  // ====================
  // CommandMessage
  // ====================

  export class CommandMessage {

		public constructor(message: Message, command?: Command, argString?: string, patternMatches?: string[]);

		public argString: string;
		public readonly attachments: Collection<string, MessageAttachment>;
		public readonly author: User;
		public readonly channel: TextChannel | DMChannel | GroupDMChannel;
		public readonly cleanContent: string;
		public readonly client: Client;
		public command: Command;
		public readonly content: string;
		public readonly createdAt: Date;
		public readonly createdTimestamp: number;
		public readonly deletable: boolean;
		public readonly editable: boolean;
		public readonly editedAt: Date;
		public readonly editedTimestamp: number;
		public readonly edits: Message[];
		public readonly embeds: MessageEmbed[];
		public readonly guild: Guild;
		public readonly id: string;
		public readonly member: GuildMember;
		public readonly mentions: MessageMentions;
		public message: Message;
		public readonly nonce: string;
		public patternMatches: string[];
		public readonly pinnable: boolean;
		public readonly pinned: boolean;
		public readonly reactions: Collection<string, MessageReaction>;
		public responsePositions: {};
		public responses: {};
		public readonly system: boolean;
		public readonly tts: boolean;
		public readonly webhookID: string;

		public anyUsage(command?: string, prefix?: string, user?: User): string;
		public clearReactions(): Promise<Message>;
		public code(lang: string, content: StringResolvable, options?: MessageOptions): Promise<Message | Message[]>
		public delete(timeout?: number): Promise<Message>;
		public direct(content: StringResolvable, options?: MessageOptions): Promise<Message | Message[]>;
		public edit(content: StringResolvable): Promise<Message>
		public editCode(lang: string, content: StringResolvable): Promise<Message>;
		public embed(embed: MessageEmbed | {}, content?: StringResolvable, options?: MessageOptions): Promise<Message | Message[]>;
		public fetchWebhook(): Promise<Webhook>;
		public isMemberMentioned(member: GuildMember | User): boolean;
		public isMentioned(data: GuildChannel | User | Role | string): boolean;
		public parseArgs(): string | string[];
		public static parseArgs(argString: string, argCount?: number, allowSingleQuote?: boolean): string[];
		public pin(): Promise<Message>
		public react(emoji: string | Emoji | ReactionEmoji): Promise<MessageReaction>;
		public reply(content: StringResolvable, options?: MessageOptions): Promise<Message | Message[]>;
		public replyEmbed(embed: MessageEmbed | {}, content?: StringResolvable, options?: MessageOptions): Promise<Message | Message[]>;
		public run(): Promise<Message | Message[]>;
		public say(content: StringResolvable, options?: MessageOptions): Promise<Message | Message[]>;
		public unpin(): Promise<Message>;
		public usage(argString?: string, prefix?: string, user?: User): string;
    public translate(id: string, args: Array<any>): string;

    private deleteRemainingResponses(): void;
    private editCurrentResponse(id: string, options?: {}): Promise<Message | Message[]>;
    private editResponse(response: Message | Message[], options?: {}): Promise<Message | Message[]>;
    private finalize(responses: Message | Message[]): void;
    private respond(options?: {}): Message | Message[];
  }

  // ====================
  // CommandRegistry
  // ====================

  type CommandGroupResolvable = CommandGroup|string;

  export class CommandRegistry {
    public constructor(client: Client);

    public commands: Collection<string, Command>;
    public groups: Collection<string, CommandGroup>;
    public types: Collection<string, ArgumentType>;
    public evalObject: object;
    public commandsPath?: string;

    public registerGroup(group: CommandGroup|Function|object|string, name?: string, guarded?: boolean): CommandRegistry;
    public registerGroups(groups: CommandGroup[]|Function[]|object[]|Array<string[]>): CommandRegistry;
    public registerCommand(command: Command|Function): CommandRegistry;
    public registerCommands(commands: Command[]|Function[]): CommandRegistry;
    public registerCommandsIn(options: string|object): CommandRegistry;
    public registerType(type: ArgumentType | Function): CommandRegistry;
		public registerTypes(type: ArgumentType[] | Function[], ignoreInvalid?: boolean): CommandRegistry;
    public registerTypesIn(options: string | {}): CommandRegistry;
    public registerDefaults(): CommandRegistry;
		public registerDefaultGroups(): CommandRegistry;
    public registerDefaultCommands(commands?: { help?: boolean, prefix?: boolean, eval?: boolean, ping?: boolean, commandState?: boolean }): CommandRegistry;
    public registerDefaultTypes(types?: { string?: boolean, integer?: boolean, float?: boolean, boolean?: boolean, user?: boolean, member?: boolean, role?: boolean, channel?: boolean, message?: boolean, command?: boolean, group?: boolean }): CommandRegistry;
    public registerEvalObject(key: string, obj: {}): CommandRegistry;
    public registerEvalObjects(obj: {}): CommandRegistry;
    public findCommands(searchString?: string, exact?: boolean, message?: Message | CommandMessage): Command[];
    public findGroups(searchString?: string, exact?: boolean): CommandGroup[];
    public resolveCommand(command: CommandResolvable): Command;
		public resolveCommandPath(groups: string, memberName: string): string;
    public resolveGroup(group: CommandGroupResolvable): CommandGroup;
    public unregisterCommand(command: Command): void;
    public reregisterCommand(command: Command | Function, oldCommand: Command): void;
  }

  // ====================
  // FriendlyError
  // ====================

  export class FriendlyError {
    public constructor(message: string);
  }

  // ====================
  // CommandFormatError
  // ====================

  export class CommandFormatError extends FriendlyError {
    public constructor(msg: CommandMessage);
  }

  // ====================
  // GuildExtension
  // ====================

  type CommandResolvable = Command|string;

  export class GuildExtension extends Guild {

    public constructor(args: Array<any>);

    public settings: GuildSettingsHelper;
    public commandPrefix: string;
    public lang: string;
    private _commandPrefix?: string;
    private _lang?: string;

    public setCommandEnabled(command: CommandResolvable, enabled: boolean);
    public isCommandEnabled(command: CommandResolvable): boolean;
    public setGroupEnabled(group: CommandGroupResolvable, enabled: boolean);
    public isGroupEnabled(group: CommandGroupResolvable): boolean;
    public commandUsage(command?: string, user?: User): string;
  }

  // ====================
  // GuildSettingsHelper
  // ====================

  export class GuildSettingsHelper {

    public constructor(client: Client, guild?: Guild);

    public guild?: Guild;

    public get(key: string, defval?: any): any;
    public set(key: string, val: any): Promise<any>;
    public remove(key: string): Promise<any>;
    public clear(): Promise<void>;
  }

  // ====================
  // SettingsProvider
  // ====================

  export abstract class SettingsProvider {

    public constructor();

    public abstract init(client: Client): Promise<void>;
    public abstract destroy(): Promise<void>;
    public abstract get(guild: Guild|string, key: string, defval?: any): any;
    public abstract set(guild: Guild|string, key: string, val: any): Promise<any>;
    public abstract remove(guild: Guild|string, key: string): Promise<any>;
    public abstract clear(guild: Guild|string, ): Promise<void>;

    public static getGuildID(guild: Guild|string): string;
  }

  // ====================
  // SQLiteProvider
  // ====================

  export class SQLiteProvider extends SettingsProvider {

    public constructor(db: SQLiteDatabase);

    public readonly client: Client;
		public db: SQLiteDatabase;
		private deleteStmt: SQLiteStatement;
		private insertOrReplaceStmt: SQLiteStatement;
		private listeners: Map<any, any>;
		private settings: Map<any, any>;

		public clear(guild: Guild | string): Promise<void>;
		public destroy(): Promise<void>;
		public get(guild: Guild | string, key: string, defVal?: any): any;
		public init(client: Client): Promise<void>;
		public remove(guild: Guild | string, key: string): Promise<any>;
		public set(guild: Guild | string, key: string, val: any): Promise<any>;
		private setupGuild(guild: string, settings: {}): void;
		private setupGuildCommand(guild: Guild, command: Command, settings: {}): void;
		private setupGuildGroup(guild: Guild, group: CommandGroup, settings: {}): void;
    private updateOtherShards(key: string, val: any): void;
  }

  // ====================
  // Client
  // ====================

	type ClientOptions = DiscordClientOptions & {
		selfbot?: boolean;
		commandPrefix?: string;
		commandEditableDuration?: number;
		nonCommandEditable?: boolean;
		unknownCommandResponse?: boolean;
		owner?: string|string[]|Set<string>;
		invite?: string;
	};

  export class Client extends DiscordClient {
		public constructor(options?: ClientOptions);

		private _commandPrefix: string;

		public commandPrefix: string;
		public dispatcher: CommandDispatcher;
		public readonly owners: User[];
		public provider: SettingsProvider;
		public registry: CommandRegistry;
		public settings: GuildSettingsHelper;

		public isOwner(user: UserResolvable): boolean;
		public setProvider(provider: SettingsProvider | Promise<SettingsProvider>): Promise<void>;

		on(event: string, listener: Function): this;
		on(event: 'commandBlocked', listener: (message: CommandMessage, reason: string) => void): this;
		on(event: 'commandError', listener: (command: Command, err: Error, message: CommandMessage, args: {} | string | string[], fromPattern: boolean) => void): this;
		on(event: 'commandPrefixChange', listener: (guild: Guild, prefix: string) => void): this;
		on(event: 'commandRegister', listener: (command: Command, registry: CommandRegistry) => void): this;
		on(event: 'commandReregister', listener: (newCommand: Command, oldCommand: Command) => void): this;
		on(event: 'commandRun', listener: (command: Command, promise: Promise<any>, message: CommandMessage, args: object | string | string[], fromPattern: boolean) => void): this;
		on(event: 'commandStatusChange', listener: (guild: Guild, command: Command, enabled: boolean) => void): this;
		on(event: 'commandUnregister', listener: (command: Command) => void): this;
		on(event: 'groupRegister', listener: (group: CommandGroup, registry: CommandRegistry) => void): this;
		on(event: 'groupStatusChange', listener: (guild: Guild, group: CommandGroup, enabled: boolean) => void): this;
		on(event: 'typeRegister', listener: (type: ArgumentType, registry: CommandRegistry) => void): this;
		on(event: 'unknownCommand', listener: (message: CommandMessage) => void): this;
		on(event: 'channelCreate', listener: (channel: Channel) => void): this;
		on(event: 'channelDelete', listener: (channel: Channel) => void): this;
		on(event: 'channelPinsUpdate', listener: (channel: Channel, time: Date) => void): this;
		on(event: 'channelUpdate', listener: (oldChannel: Channel, newChannel: Channel) => void): this;
		on(event: 'clientUserSettingsUpdate', listener: (clientUserSettings: ClientUserSettings) => void): this;
		on(event: 'debug', listener: (info: string) => void): this;
		on(event: 'disconnect', listener: (event: any) => void): this;
		on(event: 'emojiCreate', listener: (emoji: Emoji) => void): this;
		on(event: 'emojiDelete', listener: (emoji: Emoji) => void): this;
		on(event: 'emojiUpdate', listener: (oldEmoji: Emoji, newEmoji: Emoji) => void): this;
		on(event: 'error', listener: (error: Error) => void): this;
		on(event: 'guildBanAdd', listener: (guild: Guild, user: User) => void): this;
		on(event: 'guildBanRemove', listener: (guild: Guild, user: User) => void): this;
		on(event: 'guildCreate', listener: (guild: Guild) => void): this;
		on(event: 'guildDelete', listener: (guild: Guild) => void): this;
		on(event: 'guildMemberAdd', listener: (member: GuildMember) => void): this;
		on(event: 'guildMemberAvailable', listener: (member: GuildMember) => void): this;
		on(event: 'guildMemberRemove', listener: (member: GuildMember) => void): this;
		on(event: 'guildMembersChunk', listener: (members: Collection<Snowflake, GuildMember>, guild: Guild) => void): this;
		on(event: 'guildMemberSpeaking', listener: (member: GuildMember, speaking: boolean) => void): this;
		on(event: 'guildMemberUpdate', listener: (oldMember: GuildMember, newMember: GuildMember) => void): this;
		on(event: 'guildUnavailable', listener: (guild: Guild) => void): this;
		on(event: 'guildUpdate', listener: (oldGuild: Guild, newGuild: Guild) => void): this;
		on(event: 'message', listener: (message: Message) => void): this;
		on(event: 'messageDelete', listener: (message: Message) => void): this;
		on(event: 'messageDeleteBulk', listener: (messages: Collection<Snowflake, Message>) => void): this;
		on(event: 'messageReactionAdd', listener: (messageReaction: MessageReaction, user: User) => void): this;
		on(event: 'messageReactionRemove', listener: (messageReaction: MessageReaction, user: User) => void): this;
		on(event: 'messageReactionRemoveAll', listener: (message: Message) => void): this;
		on(event: 'messageUpdate', listener: (oldMessage: Message, newMessage: Message) => void): this;
		on(event: 'presenceUpdate', listener: (oldMember: GuildMember, newMember: GuildMember) => void): this;
		on(event: 'providerReady', listener: (provider: SettingsProvider) => void): this;
		on(event: 'ready', listener: () => void): this;
		on(event: 'reconnecting', listener: () => void): this;
		on(event: 'roleCreate', listener: (role: Role) => void): this;
		on(event: 'roleDelete', listener: (role: Role) => void): this;
		on(event: 'roleUpdate', listener: (oldRole: Role, newRole: Role) => void): this;
		on(event: 'typingStart', listener: (channel: Channel, user: User) => void): this;
		on(event: 'typingStop', listener: (channel: Channel, user: User) => void): this;
		on(event: 'userNoteUpdate', listener: (user: UserResolvable, oldNote: string, newNote: string) => void): this;
		on(event: 'userUpdate', listener: (oldUser: User, newUser: User) => void): this;
		on(event: 'voiceStateUpdate', listener: (oldMember: GuildMember, newMember: GuildMember) => void): this;
		on(event: 'warn', listener: (info: string) => void): this;
  }

  // ====================
  // Language
  // ====================

  export class Language {
    public constructor(client: Client, id: string, name?: string);

    public id: string;
    public name: string;
    public strings: Collection<string, LanguageString>;

    public reload();
  }

  // ====================
  // LanguageRegistry
  // ====================

  export class LanguageRegistry {
    public constructor(client: Client);

    public languages: Collection<string, Language>;
    public strings: Collection<string, LanguageString>;
    public stringsPath?: string;

    public registerLanguage(lang: Language|Function|object|string, name?: string): LanguageRegistry;
    public registerlanguages(langs: Language[]|Function[]|object[]|Array<string[]>): LanguageRegistry;
    public registerString(string: LanguageString|Function): LanguageRegistry;
    public registerStrings(strings: LanguageString[]|Function[], ignoreinvalid: boolean): LanguageRegistry;
    public registerStringsFrom(path: string, lang: string): LanguageRegistry;
    public registerDefaults(): LanguageRegistry;
    public registerDefaultLanguages(languages?: { en?: boolean, fr?: boolean }): LanguageRegistry;
    public registerDefaultStrings(): LanguageRegistry;
    public resolve(id: string, lang?: string, args?: Array<any>): string;
  }

  // ====================
  // LanguageString
  // ====================

  type LanguageStringOptions = {
    name: string;
    lang: string;
    content: Function|string;
  };

  export class LanguageString {
    public constructor(client: Client, options: LanguageStringOptions);

    public name: string;
    public langID: string;
    public content: Function|string;

    public reload();
  }
}
