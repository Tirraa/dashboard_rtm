/* v8 ignore start */
// Stryker disable all

export const APP_PROTECTED_PATHS: readonly string[] = ['/dashboard'];
export const VIP_SHORTCUTS = {
  '/sign-up': '/dashboard'
} as const;

// Stryker restore all
/* v8 ignore stop */
