import { APP_PROTECTED_PATHS } from '@/middleware';
import { describe, expect, it } from 'vitest';

import isProtectedRoute from '../isProtectedRoute';

describe('isProtectedRoute', () => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  it('should return true, given simple valid input', () => expect(isProtectedRoute(APP_PROTECTED_PATHS[0])).toBe(true));

  it('should return false, given simple invalid input', () => {
    const INVALID_INPUT_PREFIX = '$';
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    let invalidInput = APP_PROTECTED_PATHS[0];
    while (APP_PROTECTED_PATHS.includes(invalidInput)) invalidInput = INVALID_INPUT_PREFIX + invalidInput;

    expect(isProtectedRoute(invalidInput)).toBe(false);
  });
});
