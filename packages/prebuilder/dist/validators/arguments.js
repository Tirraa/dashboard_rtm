"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arg_1 = __importDefault(require("arg"));
const vocab_1 = require("../config/vocab");
const ArgumentsValidatorError_1 = __importDefault(require("../errors/ArgumentsValidatorError"));
const feedbacksMerge_1 = require("../lib/feedbacksMerge");
const config_1 = require("../config");
// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs');
const { IMPOSSIBLE_TO_START: ERROR_PREFIX } = vocab_1.CRITICAL_ERRORS_STR;
/**
 * @throws {ArgumentsValidatorError}
 */
function crashIfArgumentsAreInvalid({ ...args }) {
    const { [config_1.FLAGS.I18N_LOCALES_SCHEMA_FILEPATH]: I18N_LOCALES_SCHEMA_FILEPATH, [config_1.FLAGS.BLOG_POSTS_FOLDER]: BLOG_POSTS_FOLDER, [config_1.FLAGS.NO_BLOG]: NO_BLOG, [config_1.FLAGS.NO_I18N]: NO_I18N, _: UNKNOWN_OPTIONS } = args;
    const invalidBlogOptions = BLOG_POSTS_FOLDER === undefined && !NO_BLOG;
    const invalidI18nOptions = I18N_LOCALES_SCHEMA_FILEPATH === undefined && !NO_I18N;
    const wrongUseOfNoBlogOption = BLOG_POSTS_FOLDER !== undefined && NO_BLOG;
    const wrongUseOfNoI18nOption = I18N_LOCALES_SCHEMA_FILEPATH !== undefined && NO_I18N;
    const breakingBlogDependencyToI18n = BLOG_POSTS_FOLDER !== undefined && NO_I18N;
    const unknownOptions = UNKNOWN_OPTIONS.length > 0;
    const P = vocab_1.ARG_ERROR_PREFIX + vocab_1.UNKNOWN_OPTIONS_PREFIX;
    const P2 = vocab_1.ARG_ERROR_PREFIX + vocab_1.WRONG_OPTIONS_PREFIX;
    let feedback = unknownOptions ? P + UNKNOWN_OPTIONS.join(', ') + '\n' + vocab_1.KNOWN_OPTIONS_PREFIX + Object.values(config_1.FLAGS).join(', ') : '';
    if (invalidBlogOptions) {
        feedback += P2 + `you must use the ${config_1.FLAGS.BLOG_POSTS_FOLDER} option unless you are using the ${config_1.FLAGS.NO_BLOG} option.`;
    }
    else if (invalidI18nOptions) {
        feedback += P2 + `you can't omit the ${config_1.FLAGS.I18N_LOCALES_SCHEMA_FILEPATH} option if you don't use the ${config_1.FLAGS.NO_I18N} option.`;
    }
    else if (wrongUseOfNoBlogOption) {
        feedback += P2 + `you can't use the ${config_1.FLAGS.NO_BLOG} option if you use blog related options.`;
    }
    else if (wrongUseOfNoI18nOption) {
        feedback += P2 + `you can't use the ${config_1.FLAGS.NO_I18N} option if you use i18n related options.`;
    }
    else if (breakingBlogDependencyToI18n) {
        feedback +=
            P2 +
                `you can't use both the ${config_1.FLAGS.NO_I18N} option and blog related options: the blog feature relies on i18n.` +
                '\n' +
                `Maybe you want to use the ${config_1.FLAGS.NO_I18N} and ${config_1.FLAGS.NO_BLOG} options?`;
    }
    if (!feedback)
        return;
    feedback += '\n\n';
    feedback += 'Options:' + '\n' + JSON.stringify(args, (k, v) => ((k === '_' && !unknownOptions) || !v ? undefined : v), 2);
    throw new ArgumentsValidatorError_1.default((0, feedbacksMerge_1.prefixFeedback)(feedback, ERROR_PREFIX + '\n'));
}
/**
 * @throws {ArgumentsValidatorError}
 */
function crashIfFilesDoesNotExist({ ...args }) {
    const { [config_1.FLAGS.I18N_LOCALES_SCHEMA_FILEPATH]: I18N_LOCALES_SCHEMA_FILEPATH, [config_1.FLAGS.BLOG_POSTS_FOLDER]: BLOG_POSTS_FOLDER, [config_1.FLAGS.NO_BLOG]: NO_BLOG, [config_1.FLAGS.NO_I18N]: NO_I18N } = args;
    function checkI18n() {
        if (NO_I18N)
            return;
        const i18nDefaultLocaleFileExists = fs.existsSync(I18N_LOCALES_SCHEMA_FILEPATH);
        if (!i18nDefaultLocaleFileExists) {
            throw new ArgumentsValidatorError_1.default(ERROR_PREFIX + '\n' + "Can't open the i18n locale schema file!" + '\n' + vocab_1.DISABLE_I18N_ANALYSIS_ADVICE);
        }
        const localesSchemaIsAFile = fs.statSync(I18N_LOCALES_SCHEMA_FILEPATH).isFile();
        if (!localesSchemaIsAFile) {
            throw new ArgumentsValidatorError_1.default(ERROR_PREFIX + '\n' + 'The locale schema you indicated is NOT a file!' + '\n' + vocab_1.DISABLE_I18N_ANALYSIS_ADVICE);
        }
    }
    function checkBlog() {
        if (NO_BLOG)
            return;
        const ADVICE = vocab_1.DISABLE_BLOG_ANALYSIS_ADVICE;
        const postsFolderExists = fs.existsSync(BLOG_POSTS_FOLDER);
        if (!postsFolderExists) {
            throw new ArgumentsValidatorError_1.default(ERROR_PREFIX + '\n' + "Can't open the posts folder!" + '\n' + ADVICE);
        }
        const postsFolderIsDirectory = fs.statSync(BLOG_POSTS_FOLDER).isDirectory();
        if (!postsFolderIsDirectory) {
            throw new ArgumentsValidatorError_1.default(ERROR_PREFIX + '\n' + 'The posts folder you indicated is NOT a directory!' + '\n' + ADVICE);
        }
    }
    checkI18n();
    checkBlog();
}
function parseArguments() {
    const args = (0, arg_1.default)({
        [config_1.FLAGS.I18N_LOCALES_SCHEMA_FILEPATH]: String,
        [config_1.FLAGS.SKIP_LOCALES_INFOS]: Boolean,
        [config_1.FLAGS.BLOG_POSTS_FOLDER]: String,
        [config_1.FLAGS.NO_BLOG]: Boolean,
        [config_1.FLAGS.NO_I18N]: Boolean
    }, { permissive: true });
    crashIfArgumentsAreInvalid(args);
    crashIfFilesDoesNotExist(args);
    return args;
}
exports.default = parseArguments;
