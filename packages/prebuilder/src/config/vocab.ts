import { ArgError } from 'arg';

import { FLAGS } from '.';

export const CRITICAL_ERRORS_STR = {
  IMPOSSIBLE_TO_START: 'Impossible to start the prebuilder!',
  FAILED_TO_PASS: 'Failed to pass the prebuild!',
  INTERRUPTED: 'Interrupted the prebuilder!'
} as const;

export const PREBUILD_DONE: string = '... Prebuilder taxonomy validation and codegen done.';

export const DOC_URL: string = 'https://github.com/Tirraa/dashboard_rtm/tree/main/doc';
export const BUGTRACKER_URL: string = 'https://github.com/Tirraa/dashboard_rtm/issues';

export const ARG_ERROR_PREFIX = ArgError.name + ': ';
export const UNKNOWN_OPTIONS_PREFIX = 'unknown or unexpected option(s): ';
export const WRONG_OPTIONS_PREFIX = 'conflicting or missing option(s): ';
export const KNOWN_OPTIONS_PREFIX = 'Known options: ';
export const DISABLE_I18N_ANALYSIS_ADVICE = `If you don't use i18n in your project, use the ${FLAGS.NO_I18N} option.`;
export const DISABLE_BLOG_ANALYSIS_ADVICE = `If you don't have a blog in your project, use the ${FLAGS.NO_BLOG} option.`;
