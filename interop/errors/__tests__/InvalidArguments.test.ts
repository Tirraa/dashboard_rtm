import { InvalidArgumentsError } from '../InvalidArguments';

const FAKE_FUNCTION_NAME = 'FAKE_FUNCTION';
const FAKE_ARG = 'FAKE';
const FAKE_ARG_KEY = 'fakeArg';

it('should generate an error message with hint', () => {
  const FAKE_HINT = 'FAKE HINT';
  const FAKE_ERROR = new InvalidArgumentsError(FAKE_FUNCTION_NAME, { [FAKE_ARG_KEY]: FAKE_ARG }, FAKE_HINT);

  expect(FAKE_ERROR.message).toBe(`Impossible to ${FAKE_FUNCTION_NAME} with:
{
  "${FAKE_ARG_KEY}": "${FAKE_ARG}"
}
${FAKE_HINT}.`);
});

it('should generate an error message with trimmed hint', () => {
  const FAKE_HINT = '                   FAKE HINT              ';
  const FAKE_ERROR = new InvalidArgumentsError(FAKE_FUNCTION_NAME, { [FAKE_ARG_KEY]: FAKE_ARG }, FAKE_HINT);

  expect(FAKE_ERROR.message).toBe(`Impossible to ${FAKE_FUNCTION_NAME} with:
{
  "${FAKE_ARG_KEY}": "${FAKE_ARG}"
}
${FAKE_HINT.trim()}.`);
});

it('should generate an error message with hint, without additional punctuation (.)', () => {
  const FAKE_HINT = 'FAKE HINT.';
  const FAKE_ERROR = new InvalidArgumentsError(FAKE_FUNCTION_NAME, { [FAKE_ARG_KEY]: FAKE_ARG }, FAKE_HINT);

  expect(FAKE_ERROR.message).toBe(`Impossible to ${FAKE_FUNCTION_NAME} with:
{
  "${FAKE_ARG_KEY}": "${FAKE_ARG}"
}
${FAKE_HINT}`);
});

it('should generate an error message with hint, without additional punctuation (!)', () => {
  const FAKE_HINT = 'FAKE HINT!';
  const FAKE_ERROR = new InvalidArgumentsError(FAKE_FUNCTION_NAME, { [FAKE_ARG_KEY]: FAKE_ARG }, FAKE_HINT);

  expect(FAKE_ERROR.message).toBe(`Impossible to ${FAKE_FUNCTION_NAME} with:
{
  "${FAKE_ARG_KEY}": "${FAKE_ARG}"
}
${FAKE_HINT}`);
});

it('should generate an error message with hint, without additional punctuation (?)', () => {
  const FAKE_HINT = 'FAKE HINT?';
  const FAKE_ERROR = new InvalidArgumentsError(FAKE_FUNCTION_NAME, { [FAKE_ARG_KEY]: FAKE_ARG }, FAKE_HINT);

  expect(FAKE_ERROR.message).toBe(`Impossible to ${FAKE_FUNCTION_NAME} with:
{
  "${FAKE_ARG_KEY}": "${FAKE_ARG}"
}
${FAKE_HINT}`);
});

it('should generate an error message without hint', () => {
  const FAKE_ERROR = new InvalidArgumentsError(FAKE_FUNCTION_NAME, { [FAKE_ARG_KEY]: FAKE_ARG });

  expect(FAKE_ERROR.message).toBe(`Impossible to ${FAKE_FUNCTION_NAME} with:
{
  "${FAKE_ARG_KEY}": "${FAKE_ARG}"
}`);
});
