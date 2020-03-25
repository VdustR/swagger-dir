# @swagger-dir/core

> A Swagger.io Directory Browser

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

app.use(swaggerDir);
app.use('subPath', swaggerDir);

const server = app.listen(port);

const close = async () => {
  console.log('Service is closing...');
  await Promise.all([server.close(), swaggerDir.stop()]);
  console.log('Service is closed!');
};
```

## Options

```js
const options = {
  mode = 'production',
  logLevel, // debug: 0, info: 1, warn: 2, error: 3, none: 4. Default: info
  dateFormat, // Default: yyyy/MM/dd HH:mm:ss
  swaggerUiOptions = {},
  id, // id for log
}
```
