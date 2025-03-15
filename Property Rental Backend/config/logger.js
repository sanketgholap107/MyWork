const log4js = require('log4js');

// Configure log4js to log only to the console
log4js.configure({
  appenders: {
    console: { type: 'console' }, // Log to console
  },
  categories: {
    default: { appenders: ['console'], level: 'debug' }, // Default to console logging at 'debug' level
  },
});

const logger = log4js.getLogger(); // Default logger (console)

module.exports = { logger };
