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
const swaggerDir = require('@swagger-dir/core');

swaggerDir(path, options);

// for example
swaggerDir('/my/swagger');
swaggerDir('/my/swagger', { port: 5000 });
```

## Options

```js
const options = {
  mode = 'production',
  publicUrl = '/',
  port = 3000,
  logLevel = LOG_INFO,
  dateFormat = 'yyyy/MM/dd HH:mm:ss',
  swaggerUiOptions = {},
}
```
