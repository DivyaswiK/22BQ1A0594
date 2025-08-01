const axios = require('axios');
const { LOGGING_API_URL } = require('./constants');

/**
 * Reusable logger function
 * @param {string} stack - backend or frontend
 * @param {string} level - info, warn, error, fatal
 * @param {string} pkg - e.g. api, db, handler
 * @param {string} message - the log message
 */
async function Log(stack, level, pkg, message) {
  const payload = {
    stack,
    level,
    package: pkg,
    message
  };

  try {
    await axios.post(LOGGING_API_URL, payload);
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[${level.toUpperCase()}] [${pkg}] ${message}`);
    }
  } catch (err) {
    console.error('Failed to send log:', err.message);
  }
}

module.exports = { Log };
