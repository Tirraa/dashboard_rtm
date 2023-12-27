"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foldFeedbacks = exports.prefixFeedback = void 0;
const prefixFeedback = (feedback, prefix) => feedback ? prefix + feedback : '';
exports.prefixFeedback = prefixFeedback;
function mergeFeedbacks(feedback1, feedback2) {
    if (feedback1 && feedback2)
        return feedback1 + '\n' + feedback2;
    if (!feedback1)
        return feedback2;
    return feedback1;
}
const foldFeedbacks = (...feedbacks) => feedbacks.reduce((mergedFeedback, feedback) => mergeFeedbacks(mergedFeedback, feedback), '');
exports.foldFeedbacks = foldFeedbacks;
