/* v8 ignore start */
// Stryker disable all

class FeedbackError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FeedbackError';
  }
}

export default FeedbackError;

// Stryker restore all
/* v8 ignore stop */
