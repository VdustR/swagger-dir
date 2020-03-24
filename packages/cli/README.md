# swagger-dir CLI

> A Swagger.io Directory Browser

[More info](../../README.md)

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
  -m, --mode <mode>                            Default: production
  -s, --swagger-ui-options <swaggerUiOptions>  a JSON format swagger UI options
  -u, --public-url <publicUrl>                 Default: /
  -r, --server-public-url <serverPublicUrl>    Default: /
  -p, --port <port>                            Default: 3000
  -l, --log-level <logLevel>                   debug: 0, info: 1, warn: 2, error: 3, none: 4. Default: info
  -f, --date-format <dateFormat>               Default: yyyy/MM/dd HH:mm:ss
  -h, --help                                   display help for command
```

For example:

```sh
# browse current directory
swagger-dir
# browse specific directory
swagger-dir /path/to/my/swagger/files/folder
# you can also use npx to execute it without installing it
npx swagger-dir
```

## Docker

Pull the image:

```sh
docker pull vdustr/swagger-dir
```

Run the container:

```sh
docker run --rm --name swagger-dir -it -v /swagger-ui/files/path:/data -p 80:3000 vdustr/swagger-dir:latest
```

You have to pass environment variable `CHOKIDAR_USEPOLLING` to make files update for mac:

```sh
docker run --rm --name swagger-dir -it -v /swagger-ui/files/path:/data -p 80:3000 -e CHOKIDAR_USEPOLLING=true swagger-dir:latest
```

Check [chokidar#performance](https://github.com/paulmillr/chokidar#performance) for more information.

### Build Locally

```sh
docker build -t 'swagger-dir:latest' .
```
