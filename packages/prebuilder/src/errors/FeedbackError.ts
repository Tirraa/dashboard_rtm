/* v8 ignore start */
class FeedbackError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FeedbackError';
  }
}

export default FeedbackError;
/* v8 ignore stop */
