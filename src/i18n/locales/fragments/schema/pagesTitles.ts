/* v8 ignore start */
// Stryker disable all

import { pagesTitles } from '@rtm/generated';

const _: EmptyString = '';

const PAGES_TITLES = {
  ...pagesTitles,

  homepage: _,
  blog: _
} as const;

export default PAGES_TITLES;

type EmptyString = '';

// Stryker restore all
/* v8 ignore stop */
