/* v8 ignore start */
// Stryker disable all

import { compareAlphabeticallyDesc, compareAlphabeticallyAsc } from './portable/str/compareAlphabetically';
import hrefAndPathnameExactMatch from './notPortable/str/hrefAndPathnameExactMatch';
import hrefMatchesPathname from './notPortable/str/hrefMatchesPathname';
import indexOfNthOccurrence from './portable/str/indexOfNthOccurrence';
import getFormattedDate from './portable/str/getFormattedDate';
import getSlashEnvelope from './portable/str/getSlashEnvelope';
import countCharacter from './portable/str/countCharacter';
import endsWithChars from './portable/str/endsWithChar';
import capitalize from './portable/str/capitalize';

export {
  compareAlphabeticallyDesc,
  hrefAndPathnameExactMatch,
  compareAlphabeticallyAsc,
  indexOfNthOccurrence,
  hrefMatchesPathname,
  getFormattedDate,
  getSlashEnvelope,
  countCharacter,
  endsWithChars,
  capitalize
};

// Stryker restore all
/* v8 ignore stop */
