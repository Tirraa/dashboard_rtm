/* v8 ignore start */
// Stryker disable all
class FeedbackError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FeedbackError';
  }
}

export default FeedbackError;
/* v8 ignore stop */
// Stryker restore all
