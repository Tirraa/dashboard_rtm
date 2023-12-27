"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAMING_CONSTRAINTS_MSG = void 0;
const config_1 = require("../config");
function isValidTaxonomy(s) {
    if (s.length > config_1.MAX_TAXONOMY_LEN)
        return false;
    const regex = /^[a-z0-9][-a-z0-9]*$/;
    return regex.test(s.toLowerCase());
}
exports.NAMING_CONSTRAINTS_MSG = `Only dashes and alphanumeric characters are allowed, with the requirement that the first character MUST be a letter or a digit. Also, the maximum length allowed is: ${config_1.MAX_TAXONOMY_LEN} characters.`;
exports.default = isValidTaxonomy;
