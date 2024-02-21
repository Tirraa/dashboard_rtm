import endsWithChars from '../../src/lib/portable/str/endsWithChar';

export const PUNCTUATION = '.?!';

class InvalidArgumentsError extends Error {
  constructor(method: string, args: object, hint: string = '') {
    const _hint = hint.trim();
    const message =
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      `Impossible to ${method} with:\n${JSON.stringify(args, null, 2)}` +
      (_hint ? '\n' + _hint + (!endsWithChars(_hint, PUNCTUATION) ? '.' : '') : '');
    super(message);
    this.name = 'InvalidArgumentsError';
  }
}

export default InvalidArgumentsError;
