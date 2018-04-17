/**
 * Helper class to use {@link SettingsProvider} methods for a specific Guild
 */
class GuildSettingsHelper {
  /**
	 * @param {Client} client - Client to use the provider of
	 * @param {?Guild} guild - Guild the settings are for
	 * @private
	 */
  constructor(client, guild) {
    /**
		 * Client to use the provider of
		 * @name GuildSettingsHelper#client
		 * @type {Client}
		 * @readonly
		 */
    Object.defineProperty(this, 'client', { value: client });

    /**
		 * Guild the settings are for
		 * @type {?Guild}
		 */
    this.guild = guild;
  }

  /**
	 * Gets a setting in the guild
	 * @param {string} key - Name of the setting
	 * @param {*} [defVal] - Value to default to if the setting isn't set
	 * @returns {*}
	 * @see {@link SettingsProvider#get}
	 */
  get(key, defVal) {
    if (!this.client.provider) throw new Error('No settings provider is available.');
    return this.client.provider.get(this.guild, key, defVal);
  }

  /**
	 * Sets a setting for the guild
	 * @param {string} key - Name of the setting
	 * @param {*} val - Value of the setting
	 * @returns {Promise<*>} New value of the setting
	 * @see {@link SettingsProvider#set}
	 */
  set(key, val) {
    if (!this.client.provider) throw new Error('No settings provider is available.');
    return this.client.provider.set(this.guild, key, val);
  }

  /**
	 * Removes a setting from the guild
	 * @param {string} key - Name of the setting
	 * @returns {Promise<*>} Old value of the setting
	 * @see {@link SettingsProvider#remove}
	 */
  remove(key) {
    if (!this.client.provider) throw new Error('No settings provider is available.');
    return this.client.provider.remove(this.guild, key);
  }

  /**
	 * Removes all settings in the guild
	 * @returns {Promise<void>}
	 * @see {@link SettingsProvider#clear}
	 */
  clear() {
    if (!this.client.provider) throw new Error('No settings provider is available.');
    return this.client.provider.clear(this.guild);
  }
}

module.exports = GuildSettingsHelper;
