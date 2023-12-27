"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* v8 ignore start */
const arg_1 = require("arg");
const path_1 = __importDefault(require("path"));
const blogArchitectureMetadatas_1 = __importDefault(require("./metadatas-builders/blogArchitectureMetadatas"));
const config_1 = require("./config");
const blogArchitectureType_1 = __importDefault(require("./generators/blog/blogArchitectureType"));
const i18nBlogCategories_1 = __importDefault(require("./generators/blog/i18nBlogCategories"));
const sysBlogSubcategories_1 = __importDefault(require("./validators/sysBlogSubcategories"));
const vocab_1 = require("./config/vocab");
const sysBlogCategories_1 = __importDefault(require("./validators/sysBlogCategories"));
const ArgumentsValidatorError_1 = __importDefault(require("./errors/ArgumentsValidatorError"));
const localesInfos_1 = __importDefault(require("./validators/localesInfos"));
const sysBlogSlugs_1 = __importDefault(require("./validators/sysBlogSlugs"));
const blogType_1 = __importDefault(require("./generators/blog/blogType"));
const feedbacksMerge_1 = require("./lib/feedbacksMerge");
const arguments_1 = __importDefault(require("./validators/arguments"));
const FeedbackError_1 = __importDefault(require("./errors/FeedbackError"));
const BuilderError_1 = __importDefault(require("./errors/BuilderError"));
const HANDLED_ERRORS_TYPES = [FeedbackError_1.default, BuilderError_1.default, ArgumentsValidatorError_1.default, arg_1.ArgError];
const moveToRoot = () => process.chdir(path_1.default.join(__dirname, config_1.ROOT_FOLDER_RELATIVE_PATH_FROM_PREBUILDER_CTX));
const printPrebuilderDoneMsg = () => console.log(vocab_1.PREBUILD_DONE);
/**
 * @throws {FeedbackError}
 */
function processStaticAnalysis() {
    moveToRoot();
    try {
        const retrievedValuesFromArgs = (0, arguments_1.default)();
        const { [config_1.FLAGS.I18N_LOCALES_SCHEMA_FILEPATH]: I18N_LOCALES_SCHEMA_FILEPATH, [config_1.FLAGS.SKIP_LOCALES_INFOS]: SKIP_LOCALES_INFOS, [config_1.FLAGS.BLOG_POSTS_FOLDER]: BLOG_POSTS_FOLDER, [config_1.FLAGS.NO_I18N]: NO_I18N, [config_1.FLAGS.NO_BLOG]: NO_BLOG } = retrievedValuesFromArgs;
        let localesValidatorFeedback = '';
        if (!SKIP_LOCALES_INFOS && !NO_I18N) {
            const localesFolder = path_1.default.dirname(I18N_LOCALES_SCHEMA_FILEPATH);
            localesValidatorFeedback = (0, localesInfos_1.default)(localesFolder, I18N_LOCALES_SCHEMA_FILEPATH);
        }
        if (NO_BLOG) {
            if (localesValidatorFeedback)
                throw new FeedbackError_1.default(localesValidatorFeedback);
            printPrebuilderDoneMsg();
            return;
        }
        const sysBlogCategoriesValidatorFeedback = (0, sysBlogCategories_1.default)(BLOG_POSTS_FOLDER);
        const sysBlogSubcategoriesValidatorFeedback = (0, sysBlogSubcategories_1.default)(BLOG_POSTS_FOLDER);
        const sysBlogSlugsValidatorFeedback = (0, sysBlogSlugs_1.default)(BLOG_POSTS_FOLDER);
        const feedbacks = (0, feedbacksMerge_1.foldFeedbacks)(sysBlogCategoriesValidatorFeedback, sysBlogSubcategoriesValidatorFeedback, sysBlogSlugsValidatorFeedback, localesValidatorFeedback);
        if (feedbacks)
            throw new FeedbackError_1.default(feedbacks);
        const blogArchitecture = (0, blogArchitectureMetadatas_1.default)(BLOG_POSTS_FOLDER);
        (0, blogArchitectureType_1.default)(blogArchitecture);
        (0, i18nBlogCategories_1.default)(blogArchitecture);
        (0, blogType_1.default)(blogArchitecture);
        printPrebuilderDoneMsg();
    }
    catch (error) {
        const isErrorHandled = HANDLED_ERRORS_TYPES.some((errorType) => error instanceof errorType);
        if (isErrorHandled) {
            if (error instanceof arg_1.ArgError) {
                console.error(error + '\n');
            }
            else {
                const msg = error.message + (!(error instanceof FeedbackError_1.default) ? '\n' : '');
                console.error(msg);
            }
        }
        else {
            console.error('Unhandled error!' + '\n' + error + '\n\n' + `RTFM: ${vocab_1.DOC_URL}` + '\n' + `Bugtracker: ${vocab_1.BUGTRACKER_URL}` + '\n');
        }
        process.exit(1);
    }
}
processStaticAnalysis();
/* v8 ignore stop */
