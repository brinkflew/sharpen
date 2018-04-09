const { Collection } = require('discord.js');

/** A group for language strings */
class Language {

  /**
   * @param {Client} client - The client the language is for
   * @param {string} id - The ID for the language (usually two letters based on ISO 639)
   * @param {string} [name=id] - The full name of the language
   */
  constructor(client, id, name) {
    if (!client) throw new TypeError('A client must be specified');
    if (typeof id !== 'string') throw new TypeError('Language ID must be a string');
    if (id !== id.toLowerCase()) throw new Error('Language ID must be lowercase');

    /**
     * Client that language is for
     * @name Language#client
     * @type {Client}
     * @readonly
     */
    Object.defineProperty(this, 'client', { value: client });

    /**
     * ID of this language
     * @type {string}
     */
    this.id = id;

    /**
     * Name of this language
     * @type {string}
     */
    this.name = name;

    /**
     * The strings for this language (added upon their registration)
     * @type {Collection<string, LanguageString>}
     */
    this.strings = new Collection();
  }

  /**
   * Reloads all of the language strings
   */
  reload() {
    for (const str of this.strings.values()) str.reload();
  }
}

module.exports = Language;
