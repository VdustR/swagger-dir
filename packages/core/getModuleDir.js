const { dirname, join } = require('path');

const getModuleDir = lib => dirname(require.resolve(join(lib, 'package.json')));

module.exports = getModuleDir;
