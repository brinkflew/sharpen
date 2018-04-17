const FriendlyError = require('./FriendlyError');

/**
 * Has a descriptive message for a command not having proper format
 * @extends {FriendlyError}
 */
class CommandFormatError extends FriendlyError {

  /**
	 * @param {CommandMessage} msg - The command message the error is for
	 */
  constructor(msg) {
    super(msg.translate('CMD_FORMAT_ERROR', msg));
  }
}

module.exports = CommandFormatError;
