const format = require('date-fns/format');

class Logger {
  static LOG_DEBUG = 0;
  static LOG_INFO = 1;
  static LOG_WARN = 2;
  static LOG_ERROR = 3;
  // static LOG_NONE = 4;
  constructor({
    logLevel: level = Logger.LOG_INFO,
    dateFormat = 'yyyy/MM/dd HH:mm:ss',
    id = String(new Date().valueOf()),
  } = {}) {
    this.level = level;
    this.dateFormat = dateFormat;
    this.id = id;
  }
  get date() {
    return format(new Date(), this.dateFormat);
  }
  logDebug(...args) {
    if (this.level > Logger.LOG_DEBUG) return;
    console.log(`[${this.id}]`, this.date, '[debug]', ...args);
  }
  logInfo(...args) {
    if (this.level > Logger.LOG_INFO) return;
    console.log(`[${this.id}]`, this.date, '[info]', ...args);
  }
  logWarn(...args) {
    if (this.level > Logger.LOG_WARN) return;
    console.warn(`[${this.id}]`, this.date, '[warn]', ...args);
  }
  logError(...args) {
    if (this.level > Logger.LOG_ERROR) return;
    console.error(`[${this.id}]`, this.date, '[error]', ...args);
  }
}

module.exports = Logger;
