export class InvalidArgumentsError extends Error {
  constructor(method: string, args: object, hint: string = '') {
    const message =
      `Invalid Arguments: Impossible to ${method} with:\n${JSON.stringify(args, null, 2)}` +
      (hint ? '\n' + hint + (!hint.endsWith('.') ? '.' : '') : '');
    super(message);
    this.name = 'InvalidArgumentsError';
  }
}

export default InvalidArgumentsError;
