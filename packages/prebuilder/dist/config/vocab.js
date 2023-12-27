"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISABLE_BLOG_ANALYSIS_ADVICE = exports.DISABLE_I18N_ANALYSIS_ADVICE = exports.KNOWN_OPTIONS_PREFIX = exports.WRONG_OPTIONS_PREFIX = exports.UNKNOWN_OPTIONS_PREFIX = exports.ARG_ERROR_PREFIX = exports.BUGTRACKER_URL = exports.DOC_URL = exports.PREBUILD_DONE = exports.CRITICAL_ERRORS_STR = void 0;
const arg_1 = require("arg");
const _1 = require(".");
exports.CRITICAL_ERRORS_STR = {
    IMPOSSIBLE_TO_START: 'Impossible to start the prebuilder!',
    FAILED_TO_PASS: 'Failed to pass the prebuild!',
    INTERRUPTED: 'Interrupted the prebuilder!'
};
exports.PREBUILD_DONE = '... Prebuild done.';
exports.DOC_URL = 'https://github.com/Tirraa/dashboard_rtm/tree/main/doc';
exports.BUGTRACKER_URL = 'https://github.com/Tirraa/dashboard_rtm/issues';
exports.ARG_ERROR_PREFIX = arg_1.ArgError.name + ': ';
exports.UNKNOWN_OPTIONS_PREFIX = 'unknown or unexpected option(s): ';
exports.WRONG_OPTIONS_PREFIX = 'conflicting or missing option(s): ';
exports.KNOWN_OPTIONS_PREFIX = 'Known options: ';
exports.DISABLE_I18N_ANALYSIS_ADVICE = `If you don't use i18n in your project, use the ${_1.FLAGS.NO_I18N} option.`;
exports.DISABLE_BLOG_ANALYSIS_ADVICE = `If you don't have a blog in your project, use the ${_1.FLAGS.NO_BLOG} option.`;
