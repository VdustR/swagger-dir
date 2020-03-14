# swagger-dir

> A Swagger.io Directory Browser

## Install

```sh
npm i -g swagger-dir
yarn global add swagger-dir
```

## Usage

```
Usage: swagger-dir [options]

A Swagger.io Directory Browser

Options:
  -V, --version                                output the version number
  -d, --dir <dir>                              Swagger files directory
  -s, --swagger-ui-options <swaggerUiOptions>  a JSON format swagger UI options
  -u, --public-url <publicUrl>                 Default: /
  -p, --port <port>                            Default: 3000
  -l, --log-level <logLevel>                   debug: 0, info: 1, warn: 2, error: 3, none: 4. Default: info
  -f, --date-format <dateFormat>               Default: yyyy/MM/dd HH:mm:ss
  -h, --help                                   display help for command
```

For example:

```sh
swagger-dir
swagger-dir /path/to/my/swagger/files/folder
```
