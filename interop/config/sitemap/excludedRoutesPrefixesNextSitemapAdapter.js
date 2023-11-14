require('@transloadit/ts-fly').defaultHooks();

const APP_PROTECTED_PATHS = require('../auth').APP_PROTECTED_PATHS;
module.exports = APP_PROTECTED_PATHS;
