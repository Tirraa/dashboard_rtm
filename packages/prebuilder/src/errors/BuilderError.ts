/* v8 ignore start */
class BuilderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BuilderError';
  }
}

export default BuilderError;
/* v8 ignore stop */
