/* v8 ignore start */
// Stryker disable all
require('@transloadit/ts-fly').defaultHooks();

const APP_PROTECTED_PATHS = require('../auth').APP_PROTECTED_PATHS;
module.exports = APP_PROTECTED_PATHS;
// Stryker restore all
/* v8 ignore stop */
