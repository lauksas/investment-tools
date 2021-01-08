const manager = require('simple-node-logger').createLogManager();
const config = require('../config/config')

manager.createConsoleAppender();

const level = config.getLogLevel();

class Logger {
    getLogger(name) {
        const logger = manager.createLogger(name);
        logger.setLevel(level)
        logger.isTrace = function () {
            const l = logger.getLevel();
            const result = 'trace' == l;
            return result
        }
        const originalTrace = logger.trace
        logger.trace = function (logText) {
            if (this.isTrace()) {
                originalTrace(logText)
            }
        }
        return logger
    }
    isTrace() {
        return manager
    }
}
module.exports = new Logger()