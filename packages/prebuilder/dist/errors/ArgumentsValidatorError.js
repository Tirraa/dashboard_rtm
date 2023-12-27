"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* v8 ignore start */
class ArgumentsValidatorError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ArgumentsValidatorError';
    }
}
exports.default = ArgumentsValidatorError;
/* v8 ignore stop */
