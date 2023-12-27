"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objInnerToObj = void 0;
const objInnerToObj = (objInner) => eval('({\n' + objInner + '\n})');
exports.objInnerToObj = objInnerToObj;
