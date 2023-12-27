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
const config_1 = require("../config");
const { FAILED_TO_PASS: ERROR_PREFIX } = vocab_1.CRITICAL_ERRORS_STR;
// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs');
function sysBlogCategoriesValidator(postsFolder) {
    let feedback = '';
    const categoriesWithDefects = [];
    const maybeCategories = fs.readdirSync(postsFolder, { withFileTypes: true });
    for (const maybeCategory of maybeCategories) {
        if (!maybeCategory.isDirectory())
            continue;
        const category = maybeCategory.name;
        if (!(0, taxonomyConvention_1.default)(category)) {
            categoriesWithDefects.push(category);
        }
    }
    if (categoriesWithDefects.length > 0) {
        feedback += (0, getErrorLabelForDefects_1.default)(categoriesWithDefects, `Invalid category: ${categoriesWithDefects}` + '\n' + taxonomyConvention_1.NAMING_CONSTRAINTS_MSG + '\n', `Invalid categories: ${config_1.LIST_ELEMENT_PREFIX}${categoriesWithDefects.join(config_1.LIST_ELEMENT_PREFIX)}` + '\n' + taxonomyConvention_1.NAMING_CONSTRAINTS_MSG + '\n');
    }
    feedback = (0, feedbacksMerge_1.prefixFeedback)(feedback, ERROR_PREFIX + '\n');
    return feedback;
}
exports.default = sysBlogCategoriesValidator;
