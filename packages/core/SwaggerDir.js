const { resolve } = require('path');
const { inspect } = require('util');
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const pug = require('pug');
const Logger = require('./Logger');
const serveStatic = require('./serveStatic');
const getModuleDir = require('./getModuleDir');
const FileWatcher = require('./FileWatcher');

class SwaggerDir {
  constructor(
    dir = '',
    {
      mode = 'production',
      logLevel,
      dateFormat,
      swaggerUiOptions = {},
      id,
    } = {}
  ) {
    this.dir = resolve(process.cwd(), dir);
    this.mode = mode;
    this.logger = new Logger({ logLevel, dateFormat, id });
    this.fileWatcher = new FileWatcher(dir, this.logger);
    const renderSwaggerUi = pug.compileFile(
      resolve(__dirname, 'view/swagger-ui.pug')
    );
    this.swaggerUi = renderSwaggerUi({ options: inspect(swaggerUiOptions) });
    if (this.isDevelopment) {
      const WebpackDev = require('./WebpackDev');
      this.webpackDev = new WebpackDev(this.logger);
    }
    this.renderDirUi = pug.compileFile(resolve(__dirname, 'view/dir.pug'));
    this.logger.logDebug('[init]', {
      dir: this.dir,
      mode,
      swaggerUiOptions,
    });
  }
  get isDevelopment() {
    return this.mode === 'development';
  }
  get isProduction() {
    return this.mode === 'production';
  }
  async start() {
    this.logger.logInfo('[start] starting...');
    try {
      const tasks = [
        this.fileWatcher.start(),
        ...(!this.webpackDev ? [] : [this.webpackDev.start()]),
      ];
      await Promise.all(tasks);
      this.logger.logInfo(`[start] started!`);
    } catch (e) {
      this.logger.logError(`[start] caught error:`, e);
    }
  }
  fn = (req, res, next) => {
    this.logger.logDebug(`access: ${req.method} ${req.path}`);
    const reqPath = req.path;
    if (reqPath === '/swagger-ui') {
      res.redirect('./swagger-ui/');
      return;
    }
    if (reqPath === '/swagger-ui/') {
      res.send(this.swaggerUi);
      return;
    }
    if (reqPath === '/') {
      res.send(
        this.renderDirUi({
          files: inspect(this.fileWatcher.files, {
            maxArrayLength: Infinity,
          }),
        })
      );
      return;
    }
    if (serveStatic('swagger-ui', pathToSwaggerUi, req, res, next)) return;
    if (serveStatic('data', this.dir, req, res, next)) return;
    if (serveStatic('victormono', getModuleDir('victormono'), req, res, next))
      return;
    if (serveStatic('js', resolve(__dirname, 'jsDist'), req, res, next)) return;
    next();
  };
  async stop() {
    this.logger.logInfo('[stop] stopping...');
    try {
      const tasks = [
        this.fileWatcher.stop(),
        ...(!this.webpackDev ? [] : [this.webpackDev.stop()]),
      ];
      await Promise.all(tasks);
      this.logger.logInfo('[stop] stopped!');
    } catch (e) {
      this.logger.logError(`[stop] caught error:`, e);
    }
  }
}

module.exports = SwaggerDir;
