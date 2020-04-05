const { relative, extname } = require("path");
const walk = require("walkdir");

const extnames = ["json", "yaml", "yml"].map((ext) => `.${ext}`);
const filesSortMethod = (a, b) => a.localeCompare(b);

class FileCollector {
  constructor(dir, logger, delay = 3000) {
    this.dir = dir;
    this.logger = logger;
    this.delay = delay;
    this.timeout = null;
    this.files = [];
  }
  async walk() {
    this.logger.logDebug("[file] start walking...");
    try {
      const result = await walk.async(this.dir, {
        return_object: true,
      });
      this.logger.logDebug("[file] walk result:", result);
      const files = Object.entries(result)
        .filter(
          ([path, stats]) => stats.isFile() && extnames.includes(extname(path))
        )
        .map(([path]) => relative(this.dir, path))
        .sort(filesSortMethod);
      this.logger.logDebug("[file] walk files:", files);
      this.files = files;
      this.logger.logDebug("[file] walk success!");
    } catch (e) {
      this.logger.logError("[file] got error:", e);
    }
  }
  clear() {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = null;
  }
  start() {
    const exec = async () => {
      this.clear();
      await this.walk();
      this.timeout = setTimeout(exec, this.delay);
    };
    exec();
  }
  async stop() {
    this.logger.logInfo("[file] walk stopping...");
    this.clear();
    this.logger.logInfo("[file] walk stopped!");
  }
}

module.exports = FileCollector;
