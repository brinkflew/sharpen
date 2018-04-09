const path = require('path');

/**
 * @typedef {Object} LanguageStringOptions
 * @property {string} name - The name of the string
 * @property {string} lang - The ID of the language the string is written in
 * @property {Function|string} content - The content of the string (what is actually written),
 * can be a template litteral
 */

/** A string that can be sent in a message */
class LanguageString {

  /**
   * @param {Client} client - The client the string is for
   * @param {LanguageStringOptions} options - Options for the string
   */
  constructor(client, options) {
    if (!client) throw new TypeError('A client must be specified');
    if (typeof options.name !== 'string') throw new TypeError('String name must be a string');
    if (typeof options.lang !== 'string') throw new TypeError('Language ID must be a string');
    if (options.lang !== options.lang.toLowerCase()) throw new Error('Language ID must be lowercase');
    if (typeof options.content !== 'string' && typeof options.content !== 'function') {
      throw new TypeError('Language ID must be a function or a string');
    }

    /**
		 * Client that this string is for
		 * @name LanguageString#client
		 * @type {Client}
		 * @readonly
		 */
    Object.defineProperty(this, 'client', { value: client });

    /**
     * Name of this string
     * @type {string}
     */
    this.name = options.name;

    /**
     * ID of the language the string is written in
     * @type {string}
     */
    this.langID = options.lang;

    /**
     * Content of the language string (can be a template litteral)
     * @type {Function|string}
     */
    this.content = options.content;
  }

  /**
   * Reload the string
   */
  reload() {
    let strPath, cached, newStr;
    try {
      strPath = this.client.translator.resolveStringPath(this.langID, this.name);
      cached = require.cache[strPath];
      delete require.cache[strPath];
      newStr = require(strPath);
    } catch (err) {
      if (cached) require.cache[strPath] = cached;
      try {
        strPath = path.join(__dirname, `${this.langID}.js`);
        cached = require.cache[strPath];
        delete require.cache[strPath];
        newStr = require(strPath);
      } catch (err2) {
        if (cached) require.cache[strPath] = cached;
        if (err2.message.includes('Cannot find module')) throw err; else throw err2;
      }
    }

    this.client.translator.reregisterString(newStr, this);
  }
}

module.exports = LanguageString;
