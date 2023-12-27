"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
function getErrorLabelForDefects(defectsList, eSingular, ePlural, autoFormatter = false) {
    if (defectsList.length === 1)
        return autoFormatter ? eSingular + ' ' + `${defectsList}` + '\n' : eSingular;
    return autoFormatter ? ePlural + ' ' + `${config_1.LIST_ELEMENT_PREFIX}${defectsList.join(config_1.LIST_ELEMENT_PREFIX)}` + '\n' : ePlural;
}
exports.default = getErrorLabelForDefects;
