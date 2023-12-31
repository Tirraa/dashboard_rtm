/* v8 ignore start */
// Stryker disable all
class BuilderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BuilderError';
  }
}

export default BuilderError;
/* v8 ignore stop */
// Stryker restore all
