# @swagger-dir/core

> A Swagger.io Directory Browser

Please read the documentation on the official site: <https://github.com/VdustR/swagger-dir/tree/master/packages/core>

[More info](../../README.md)

## Install

```js
npm i @swagger-dir/core
// or use yarn
yarn add @swagger-dir/core
```

## Usage

```js
const app = express();
const SwaggerDir = require('@swagger-dir/core');
const swaggerDir = new SwaggerDir(dir, options);
swaggerDir.start();

app.use(swaggerDir.fn);
app.use('subPath', swaggerDir.fn);

const server = app.listen(port);

const close = async () => {
  console.log('Service is closing...');
  await Promise.all([server.close(), swaggerDir.stop()]);
  console.log('Service is closed!');
};
```

Or you can check how the [Swagger DIR CLI](https://github.com/VdustR/swagger-dir/blob/master/packages/cli/bin/swagger-dir) works for reference.

## Options

```js
const options = {
  mode = 'production',
  logLevel, // debug: 0, info: 1, warn: 2, error: 3, none: 4. Default: info
  formatDate, // Default: date => date.toISOString()
  swaggerUiOptions = {},
  id, // id for log
}
```
