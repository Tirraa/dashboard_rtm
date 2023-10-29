import { BLOG_ARCHITECTURE_TYPE_STR, BLOG_CATEGORIES_I18N_ROOT_KEY } from '.';

export const CRITICAL_ERRORS_STR = {
  IMPOSSIBLE_TO_START: 'Impossible to start the static analyzer!',
  INTERRUPTED: 'Interrupted the static analyzer!',
  FAILED_TO_PASS: 'Failed to pass the static analysis!'
} as const;

export const STATIC_ANALYSIS_DONE: string = '... Static analysis done.';

export const DOC_URL: string = 'https://github.com/Tirraa/dashboard_rtm/tree/main/doc';
export const BUGTRACKER_URL: string = 'https://github.com/Tirraa/dashboard_rtm/issues';

export const UPDATE_THE_BLOG_CATEGORIES_OBJECT = `(Update the '${BLOG_CATEGORIES_I18N_ROOT_KEY}' object)`;
export const UPDATE_THE_BLOG_ARCHITECTURE_TYPE = `(Update the '${BLOG_ARCHITECTURE_TYPE_STR}' type)`;
