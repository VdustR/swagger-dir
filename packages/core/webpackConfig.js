const { resolve } = require('path');

const jsSrcDir = resolve(__dirname, 'js');
const jsDir = resolve(__dirname, 'jsDist');

const webpackConfig = ({ mode = 'production' } = {}) => ({
  mode,
  bail: mode === 'production',
  devtool: mode === 'production' ? 'source-map' : 'cheap-module-source-map',
  entry: resolve(jsSrcDir, 'app.js'),
  output: {
    path: jsDir,
    filename: 'app.js',
    library: 'swagger-dir',
    libraryTarget: 'umd',
    publicPath: './',
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
});

module.exports = webpackConfig;
