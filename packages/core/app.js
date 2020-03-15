const { tmpdir } = require('os');
const { dirname, join, relative, resolve } = require('path');
const { inspect } = require('util');
const format = require('date-fns/format');
const express = require('express');
const helmet = require('helmet');
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const pug = require('pug');
const chokidar = require('chokidar');
const webpack = require('webpack');

const LOG_DEBUG = 0;
const LOG_INFO = 1;
const LOG_WARN = 2;
const LOG_ERROR = 3;
// const LOG_NONE = 4;

const swaggerFileRegex = /\.(json|yaml|yml)$/;

const jsSrcDir = resolve(__dirname, 'js');
const swaggerFilesSortMethod = (a, b) => a.localeCompare(b);

const webpackConfig = ({ mode, publicUrl, jsDir }) => ({
  mode,
  bail: mode === 'production',
  devtool: mode === 'production' ? 'source-map' : 'cheap-module-source-map',
  entry: resolve(jsSrcDir, 'app.js'),
  output: {
    path: jsDir,
    filename: 'app.js',
    library: 'swagger-dir',
    libraryTarget: 'umd',
    publicPath: publicUrl,
  },
  externals: {
    baseDir: 'baseDir',
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [jsSrcDir],
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              [
                require.resolve('@emotion/babel-preset-css-prop'),
                {
                  autoLabel: true,
                  labelFormat: '[local]',
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      PUBLIC_URL: publicUrl,
    }),
  ],
});

const swaggerDir = (
  dir = '',
  {
    mode = 'production',
    publicUrl = '/',
    port = 3000,
    logLevel = LOG_INFO,
    dateFormat = 'yyyy/MM/dd HH:mm:ss',
    swaggerUiOptions = {},
  } = {}
) => {
  dir = resolve(process.cwd(), dir);
  const app = express();
  app.use(helmet());
  const getDateStr = () => format(new Date(), dateFormat);
  const logDebug =
    logLevel > LOG_DEBUG
      ? Function.prototype
      : (...args) => console.log(getDateStr(), '[debug]', ...args);
  const logInfo =
    logLevel > LOG_INFO
      ? Function.prototype
      : (...args) => console.log(getDateStr(), '[info]', ...args);
  const logWarn =
    logLevel > LOG_WARN
      ? Function.prototype
      : (...args) => console.warn(getDateStr(), '[warn]', ...args);
  const logError =
    logLevel > LOG_ERROR
      ? Function.prototype
      : (...args) => console.error(getDateStr(), '[error]', ...args);
  const id = String(new Date().valueOf());
  const jsDir = join(tmpdir(), 'swagger-dir', id, 'js');
  logDebug(`jsDir: ${jsDir}`);
  logDebug('Starting swagger-dir...', `mode: ${inspect(mode)}`);
  const renderDir = pug.compileFile(resolve(__dirname, 'view/dir.pug'));
  const renderSwaggerUi = pug.compileFile(
    resolve(__dirname, 'view/swagger-ui.pug')
  );
  const swaggerUi = renderSwaggerUi({ options: inspect(swaggerUiOptions) });
  let swaggerFiles = [];

  const watchFileActions = {
    add: path => {
      if (!path.match(swaggerFileRegex)) return;
      if (swaggerFiles.includes(path)) {
        logWarn('[watch]', `path ${inspect(path)} exists.`);
        return;
      }
      swaggerFiles = [...swaggerFiles, path].sort(swaggerFilesSortMethod);

      logDebug(
        '[watch]',
        `${path} added!`,
        `swaggerFiles: ${inspect(swaggerFiles)}`
      );
    },
    unlink: path => {
      if (!path.match(swaggerFileRegex)) return;
      if (!swaggerFiles.includes(path)) {
        logWarn('[watch]', `path ${inspect(path)} doesn't exist.`);
        return;
      }
      swaggerFiles = swaggerFiles.filter(file => file !== path);
      logDebug(
        '[watch]',
        `${path} removed!`,
        `swaggerFiles: ${inspect(swaggerFiles)}`
      );
    },
  };
  chokidar
    .watch(dir.concat('/**'))
    .on('all', (event, path) => {
      const relativePath = relative(dir, path);
      logDebug('[watch]', `[${event}]`, relativePath);
      if (typeof watchFileActions[event] === 'function')
        watchFileActions[event](relativePath);
    })
    .on('error', error =>
      logError('[watch]', `watcher error: ${inspect(error)}`)
    )
    .on('ready', () => logDebug('[watch]', `${dir} initialed!`));
  // build js
  const compiler = webpack(webpackConfig({ mode, publicUrl, jsDir }));
  if (mode === 'development') {
    compiler.watch(
      {
        aggregateTimeout: 300,
        poll: undefined,
      },
      (err, stats) => {
        if (err) {
          logError('[buildJs]', `got error: ${inspect(err)}`);
          return;
        }
        logInfo('[buildJs]', 'built successfully!');
      }
    );
  } else {
    compiler.run((err, stats) => {
      if (err) {
        logError('[buildJs]', `got error: ${inspect(err)}`);
        return;
      }
      logInfo('[buildJs]', 'built successfully!');
    });
  }

  if (logLevel <= LOG_DEBUG) {
    // access log
    app.use(join(publicUrl, '*'), function(req, res, next) {
      logInfo(`got requested: ${req.method} ${req.originalUrl}`);
      next();
    });
  }

  if (publicUrl !== '/') {
    app.get('/', function(req, res) {
      res.redirect(publicUrl);
    });
  }

  app.get(publicUrl, function(req, res) {
    res.redirect(join(publicUrl, 'dir'));
  });

  app.get(join(publicUrl, 'swagger-ui/'), function(req, res) {
    res.send(swaggerUi);
  });

  app.use(join(publicUrl, 'swagger-ui'), express.static(pathToSwaggerUi));
  app.use(join(publicUrl, 'data'), express.static(dir));
  app.use(join(publicUrl, 'js'), express.static(jsDir));

  // favicon
  app.use(join(publicUrl, 'favicon-16x16.png'), (req, res) =>
    res.sendFile(
      join(dirname(require.resolve('swagger-ui-dist')), 'favicon-16x16.png')
    )
  );
  app.use(join(publicUrl, 'favicon-32x32.png'), (req, res) =>
    res.sendFile(
      join(dirname(require.resolve('swagger-ui-dist')), 'favicon-32x32.png')
    )
  );

  const servedLibraries = ['victormono'];
  servedLibraries.forEach(lib =>
    app.get(join(publicUrl, 'lib', lib), express.static(require.resolve(lib)))
  );

  app.get(join(publicUrl, 'dir(/*)?'), function(req, res) {
    // remove tailing `/`
    if (req.originalUrl.substr(-1) === '/') {
      res.redirect(req.originalUrl.substr(0, req.originalUrl.length - 1));
      return;
    }
    const baseDir = (req.params[0] || '/').substr(1);
    const baseDirWithTailingSlash = `${baseDir}/`;
    const filteredFiles = !baseDir
      ? swaggerFiles
      : swaggerFiles
          .filter(
            file =>
              !baseDir ||
              file.substr(0, baseDirWithTailingSlash.length) ===
                baseDirWithTailingSlash
          )
          .map(file => file.substr(baseDirWithTailingSlash));
    res.send(
      renderDir({
        publicUrl,
        baseDir: inspect(baseDir),
        files: inspect(filteredFiles),
      })
    );
  });

  app.get('/*', (req, res) => res.status(404).send('Not Found'));

  app.listen(port);
  logInfo(`swagger-dir is listening on port: ${port}`);
};

module.exports = swaggerDir;
