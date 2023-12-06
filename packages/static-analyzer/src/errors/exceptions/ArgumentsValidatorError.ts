class ArgumentsValidatorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ArgumentsValidatorError';
  }
}

export default ArgumentsValidatorError;
