#!/usr/bin/env node

const swaggerDir = require('@swagger-dir/core');
const program = require('commander');
const pkg = require('../package.json');

const cwd = process.cwd();

program
  .version(pkg.version)
  .description(pkg.description)
  .option('-d, --dir <dir>', 'Swagger files directory')
  .option(
    '-s, --swagger-ui-options <swaggerUiOptions>',
    'a JSON format swagger UI options'
  )
  .option('-u, --public-url <publicUrl>', 'Default: /')
  .option('-p, --port <port>', 'Default: 3000')
  .option(
    '-l, --log-level <logLevel>',
    'debug: 0, info: 1, warn: 2, error: 3, none: 4. Default: info'
  )
  .option('-f, --date-format <dateFormat>', 'Default: yyyy/MM/dd HH:mm:ss')
  .parse(process.argv);

swaggerDir(program.dir || cwd, {
  ...(!program.swaggerUiOptions
    ? null
    : { swaggerUiOptions: JSON.parse(program.swaggerUiOptions) }),
  ...(!program.publicUrl ? null : { publicUrl: program.publicUrl }),
  ...(!program.port ? null : { port: program.port }),
  ...(!program.logLevel ? null : { logLevel: program.logLevel }),
  ...(!program.dateFormat ? null : { dateFormat: program.dateFormat }),
});
