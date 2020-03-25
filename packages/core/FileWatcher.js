const { relative } = require('path');
const { inspect } = require('util');
const chokidar = require('chokidar');

const swaggerFileRegex = /\.(json|yaml|yml)$/;
const filesSortMethod = (a, b) => a.localeCompare(b);

class FileWatcher {
  constructor(dir, logger) {
    this.dir = dir;
    this.logger = logger;
    this.fileWatcher = chokidar.watch(dir.concat('/**'));
    this.files = [];

    this.watchFileActions = {
      add: path => {
        if (!path.match(swaggerFileRegex)) return;
        if (this.files.includes(path)) {
          this.logger.logWarn('[FileWatcher]', `path ${inspect(path)} exists.`);
          return;
        }
        this.files = [...this.files, path].sort(filesSortMethod);

        this.logger.logDebug(
          '[FileWatcher]',
          `${path} added!`,
          `files: ${inspect(this.files)}`
        );
      },
      unlink: path => {
        if (!path.match(swaggerFileRegex)) return;
        if (!this.files.includes(path)) {
          this.logger.logWarn(
            '[FileWatcher]',
            `path ${inspect(path)} doesn't exist.`
          );
          return;
        }
        this.files = this.files.filter(file => file !== path);
        this.logger.logDebug(
          '[FileWatcher]',
          `${path} removed!`,
          `files: ${inspect(this.files)}`
        );
      },
    };
  }
  start() {
    this.logger.logInfo('[FileWatcher] starting...');
    return new Promise(resolve =>
      this.fileWatcher
        .on('all', (event, path) => {
          const relativePath = relative(this.dir, path);
          this.logger.logDebug('[FileWatcher]', `[${event}]`, relativePath);
          if (typeof this.watchFileActions[event] === 'function')
            this.watchFileActions[event](relativePath);
        })
        .on('error', error =>
          this.logger.logError('[FileWatcher]', `error: ${inspect(error)}`)
        )
        .on('ready', () => {
          this.logger.logInfo('[FileWatcher]', `${this.dir} started!`);
          resolve();
        })
    );
  }
  async stop() {
    this.logger.logInfo('[FileWatcher]', 'stopping...');
    await this.fileWatcher.close();
    this.logger.logInfo('[FileWatcher]', 'stopped!');
  }
}

module.exports = FileWatcher;
