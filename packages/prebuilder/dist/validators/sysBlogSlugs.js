"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taxonomyConvention_1 = __importStar(require("./taxonomyConvention"));
const getErrorLabelForDefects_1 = __importDefault(require("../lib/getErrorLabelForDefects"));
const feedbacksMerge_1 = require("../lib/feedbacksMerge");
const vocab_1 = require("../config/vocab");
const traverseFolder_1 = __importDefault(require("../lib/traverseFolder"));
const config_1 = require("../config");
const { FAILED_TO_PASS: ERROR_PREFIX } = vocab_1.CRITICAL_ERRORS_STR;
function sysBlogSlugsValidator(postsFolder) {
    let feedback = '';
    const foldersWithDefects = {};
    const filesCollection = (0, traverseFolder_1.default)(postsFolder);
    for (const file of filesCollection) {
        const slug = file.filename;
        if (!(0, taxonomyConvention_1.default)(slug)) {
            if (!foldersWithDefects[file.fileDirectory])
                foldersWithDefects[file.fileDirectory] = [];
            foldersWithDefects[file.fileDirectory].push(slug);
        }
    }
    Object.entries(foldersWithDefects).forEach(([folderWithDefects, defects]) => {
        if (feedback)
            feedback += '\n';
        feedback += (0, getErrorLabelForDefects_1.default)(defects, `Invalid slug in the '${folderWithDefects}' folder: ${defects}` + '\n' + taxonomyConvention_1.NAMING_CONSTRAINTS_MSG + '\n', `Invalid slugs in the '${folderWithDefects}' folder: ${config_1.LIST_ELEMENT_PREFIX}${defects.join(config_1.LIST_ELEMENT_PREFIX)}` +
            '\n' +
            taxonomyConvention_1.NAMING_CONSTRAINTS_MSG +
            '\n');
    });
    feedback = (0, feedbacksMerge_1.prefixFeedback)(feedback, ERROR_PREFIX + '\n');
    return feedback;
}
exports.default = sysBlogSlugsValidator;
