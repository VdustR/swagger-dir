const defaultFormatDate = date => date.toISOString();

class Logger {
  static LOG_DEBUG = 0;
  static LOG_INFO = 1;
  static LOG_WARN = 2;
  static LOG_ERROR = 3;
  // static LOG_NONE = 4;
  constructor({
    logLevel: level = Logger.LOG_INFO,
    formatDate = defaultFormatDate,
    id = String(new Date().valueOf()),
  } = {}) {
    this.level = level;
    this.formatDate = formatDate;
    this.id = id;
  }
  get date() {
    return this.formatDate(new Date(), this.formatDate);
  }
  logDebug(...args) {
    if (this.level > Logger.LOG_DEBUG) return;
    console.log(this.date, `[${this.id}]`, '[debug]', ...args);
  }
  logInfo(...args) {
    if (this.level > Logger.LOG_INFO) return;
    console.log(this.date, `[${this.id}]`, '[info]', ...args);
  }
  logWarn(...args) {
    if (this.level > Logger.LOG_WARN) return;
    console.warn(this.date, `[${this.id}]`, '[warn]', ...args);
  }
  logError(...args) {
    if (this.level > Logger.LOG_ERROR) return;
    console.error(this.date, `[${this.id}]`, '[error]', ...args);
  }
}

module.exports = Logger;
