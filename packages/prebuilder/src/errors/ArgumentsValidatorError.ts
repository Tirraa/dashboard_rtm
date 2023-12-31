/* v8 ignore start */
// Stryker disable all
class ArgumentsValidatorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ArgumentsValidatorError';
  }
}

export default ArgumentsValidatorError;
/* v8 ignore stop */
// Stryker restore all
