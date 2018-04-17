/**
 * Has a message that can be considered user-friendly
 * @extends {Error}
 */
class FriendlyError extends Error {
  /** @param {string} message - The error message */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

module.exports = FriendlyError;
