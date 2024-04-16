import { APP_PROTECTED_PATHS } from '##/config/auth';
import { describe, expect, it, vi } from 'vitest';

import isProtectedRoute from '../isProtectedRoute';

vi.mock('##/config/auth', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('##/config/auth')>();

  return {
    ...mod,
    APP_PROTECTED_PATHS: ['/protected']
  };
});

describe('isProtectedRoute', () => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const protectedPrefix = APP_PROTECTED_PATHS[0];
  it('should return true, given simple valid input', () => expect(isProtectedRoute(protectedPrefix)).toBe(true));

  it('should return true, given valid prefixed input', () => expect(isProtectedRoute(protectedPrefix + '/' + 'foo')).toBe(true));

  it('should return false, given simple invalid input', () => {
    const INVALID_INPUT_PREFIX = '$';
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    let invalidInput = APP_PROTECTED_PATHS[0];
    while (APP_PROTECTED_PATHS.includes(invalidInput)) invalidInput = INVALID_INPUT_PREFIX + invalidInput;

    expect(isProtectedRoute(invalidInput)).toBe(false);
  });
});

vi.doUnmock('##/config/auth');
