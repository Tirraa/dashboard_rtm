"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* v8 ignore start */
class FeedbackError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FeedbackError';
    }
}
exports.default = FeedbackError;
/* v8 ignore stop */
