const { Collection } = require('discord.js');
const Language = require('./Language');
const LanguageString = require('./LanguageString');

/**
 * Emitted when a language is registered
 * @event Client#languageRegister
 * @param {string}
 */

/**
 * Handles registration and searching of language strings
 */
class LanguageRegistry {

  /**
   * @param {Client} client  -Client the registry is for
   */
  constructor(client) {

    /**
		 * The client this registry is for.
		 * @name LanguageRegistry#client
		 * @type {Client}
		 * @readonly
		 */
    Object.defineProperty(this, 'client', { value: client });

    /**
     * Registered languages
     * @type {Collection<string, Language>}
     */
    this.languages = new Collection();

    /**
     * Registered strings
     * @type {Collection<string, LanguageString>}
     */
    this.strings = new Collection();

    /**
     * Fully resolved path to the strings' directory
     * @type {?string}
     */
    this.stringsPath = null;
  }

  /**
   * Registers a single language
   * @param {Language|Function|Object|string} lang - A Language instance, a constructor or the Language ID
   * @param {string} [name] - Name for the language (if the first argument is the language ID)
   * @returns {LanguageRegistry}
   * @see {@link LanguageRegistry#registerLanguages}
   */
  registerLanguage(lang, name) {
    if (typeof lang === 'string') {
      lang = new Language(this.client, lang, name);
    } else if (typeof lang === 'function') {
      lang = new lang(this.client);
    } else if (typeof lang === 'object' && !(lang instanceof Language)) {
      lang = new Language(this.client, lang.id, lang.name);
    }

    const existing = this.languages.get(lang.id);
    if (existing) {
      existing.name = lang.name;
      this.client.emit('debug', `Lang ${lang.id} is already registered; renamed it to "${lang.name}".`);
    } else {
      this.languages.set(lang.id, lang);
      this.client.emit('languageRegister', lang, this);
      this.client.emit('debug', `Registered language ${lang.id}.`);
    }

    return this;
  }

  /*
   * Registers multiple languages
	 * @param {Language[]|Function[]|Object[]|Array<string[]>} langs - An array of Language instances,
	 * constructors, plain objects (with ID, name, and guarded properties),
	 * or arrays of {@link LanguageRegistry#registerLanguage} parameters
	 * @return {LanguageRegistry}
	 * @example
	 * ```js
	 * registry.registerLanguage([
	 * 	['en', 'English'],
	 * 	['fr', 'Français']
	 * ]);
	 * ```
	 * @example
	 * ```js
	 * registry.registerLanguages([
	 * 	{ id: 'en', name: 'English' },
	 * 	{ id: 'fr', name: 'Français' }
	 * ]);
	 * ```
	 */
  registerLanguages(langs) {
    if (!Array.isArray(langs)) throw new TypeError('Langs must be an Array.');
    for (const lang of langs) {
      if (Array.isArray(lang)) this.registerLanguage(...lang);
      else this.registerLang(lang);
    }
    return this;
  }

  /**
   * Registers a single language string
   * @param {LanguageString|Function} string - A LanguageString instance, or a constructor for one
   * @returns {LanguageRegistry}
   * @see {@link LanguageRegistry#registerStrings}
   */
  registerString(string) {
    if (typeof string === 'function') string = new string(this.client);
    if (!(string instanceof LanguageString)) throw new Error(`Invalid language string object to register: ${string}`);

    // Make sure there aren't any conflicts
    if (this.strings.some((str) => str.name === string.name && str.langID === string.langID)) {
      throw new Error(
        `A language string with the name "${string.name}" is already registered for language ${string.langID}.`
      );
    }

    const language = this.languages.find((lang) => lang.id === string.langID);
    if (!language) throw new Error(`Language "${string.langID}" is not registered.`);
    if (language.strings.some((str) => str.name === string.name)) {
      throw new Error(`A language string with name "${string.name}" is already registered in ${language.id}.`);
    }

    // Add the string
    string.lang = language;
    language.strings.set(string.name, string);
    this.strings.set(`[${string.langID}]${string.name}`, string);

    /**
     * Emitted when a sring is registered
     * @event Client#languageStringRegister
     * @param {LanguageString} string - String that was registered
     * @param {LanguageRegistry} registry - Registry that the string was registered to
     */
    this.client.emit('languageStringRegister', string, this);
    this.client.emit('debug', `Registered language string ${language.id}:${string.name}.`);

    return this;
  }

  /**
	 * Registers multiple language strings
	 * @param {LanguageString[]|Function[]} strings - An array of LanguageString instances or constructors
	 * @param {boolean} [ignoreInvalid=false] - Whether to skip over invalid objects without throwing an error
	 * @returns {CommandRegistry}
	 */
  registerStrings(strings, ignoreInvalid = false) {
    if (!Array.isArray(strings)) throw new TypeError('Strings must be an Array.');
    for (const string of strings) {
      if (ignoreInvalid && typeof string !== 'function' && !(string instanceof LanguageString)) {
        this.client.emit('warn', `Attempting to register an invalid command object: ${string}; skipping.`);
        continue;
      }
      this.registerCommand(string);
    }
    return this;
  }

  /**
   * Parses a file to find and register strings
   * @param {string} path - Path to the file where strings are defined
   * @param {string} lang - Language of the strings to register
   * @returns {LanguageRegistry}
   * @private
   */
  registerStringsFrom(path, lang) {
    const strings = require(path);
    if (typeof strings !== 'object') throw new TypeError('File must export an object of functions or strings');
    for (let string of Object.entries(strings)) {
      string = new LanguageString(this.client, { name: string[0], content: string[1], lang: lang });
      this.registerString(string);
    }

    return this;
  }

  /**
	 * Registers the default languages and strings. This is equivalent to:
	 * ```js
	 * registry.registerDefaultLanguages()
	 * 	.registerDefaultStrings();
	 * ```
	 * @returns {LanguageRegistry}
	 */
  registerDefaults() {
    this.registerDefaultLanguages();
    this.registerDefaultStrings();
    return this;
  }

  /**
   * Registers the default languages to the registry
   * @param {Object} [languages] - Object specifying which languages to register
   * @param {boolean} [languages.en=true] - Whether to register the built-in English language
   * @returns {LanguageRegistry}
   */
  registerDefaultLanguages(languages = {}) {
    languages = {
      en: true, fr: true,
      languages
    };

    if (languages.en) this.registerLanguage('en', 'English');
    if (languages.fr) this.registerLanguage('fr', 'Français');

    return this;
  }

  /**
   * Registers the default language strings to the registry
   * @returns {LanguageRegistry}
   */
  registerDefaultStrings() {
    if (this.languages.has('en')) this.registerStringsFrom('./defaults/en', 'en');
    if (this.languages.has('fr')) this.registerStringsFrom('./defaults/fr', 'fr');

    return this;
  }

  /**
   * Fetches a string and displays it in the right language
   * @param {string} id - ID for the string to fetch
   * @param {string} [lang] - Language to use for the string
   * @param {Array<*>} [args] - Arguments to pass to the string if needed
   * @returns {string}
   */
  resolve(id, lang, ...args) {
    if (typeof id !== 'string') throw new TypeError('ID must be a string');
    if (typeof lang !== 'string') lang = this.client.lang;

    const language = this.languages.get(lang);
    if (!language) throw new Error(`Language ${lang} is not registered`);
    let string = language.strings.get(id);
    if (!string) throw new Error(`Language string "${id}" is not registered`);
    string = string.content;
    if (typeof string === 'string') return string;
    if (typeof string === 'function') return string(...args);
    throw new Error(`Unsupported type for language strings: ${typeof string}`);
  }
}

module.exports = LanguageRegistry;
