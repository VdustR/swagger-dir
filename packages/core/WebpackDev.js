const { inspect } = require('util');
const webpack = require('webpack');
const webpackConfig = require('./webpackConfig');

class WebpackDev {
  constructor(logger) {
    this.logger = logger;
    this.compiler = webpack(webpackConfig({ mode: 'development' }));
    this.watch = null;
  }
  start() {
    let resolved = false;
    return new Promise(
      resolve =>
        (this.watch = this.compiler.watch(
          {
            aggregateTimeout: 300,
            poll: undefined,
          },
          (err, stats) => {
            if (err) {
              this.logger.logError(
                '[WebpackDev]',
                `got error: ${inspect(err)}`
              );
              return;
            }
            this.logger.logInfo('[WebpackDev]', 'built successfully!');
            if (!resolved) {
              resolved = true;
              resolve();
            }
          }
        ))
    );
  }
  stop() {
    if (!this.watch) return;
    return new Promise(resolve => this.watch.close(resolve));
  }
}

module.exports = WebpackDev;
