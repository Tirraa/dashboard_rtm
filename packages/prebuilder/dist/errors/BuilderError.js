"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* v8 ignore start */
class BuilderError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BuilderError';
    }
}
exports.default = BuilderError;
/* v8 ignore stop */
