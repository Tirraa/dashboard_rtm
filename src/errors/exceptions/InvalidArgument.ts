export class InvalidArgumentsError extends Error {
  constructor(method: string, args: object) {
    super(`Invalid Arguments: Impossible to ${method} with:\n${JSON.stringify(args, null, 2)}`);
    this.name = 'InvalidArgumentsError';
  }
}

export default InvalidArgumentsError;
