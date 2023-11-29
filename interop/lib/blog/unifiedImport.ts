import isValidLanguageFlag from '../../../src/lib/functions/i18n/isValidLanguageFlag';
import capitalize from '../../../src/lib/functions/str/capitalize';
import { indexOfNthOccurrence } from '../../../src/lib/functions/str/indexOfNthOccurrence';
import pluralize from '../../../src/lib/functions/str/pluralize';
import { POSTS_FOLDER } from '../../config/blog/documentSpecs';
import { DEFAULT_LANGUAGE } from '../../config/i18n';
import ROUTES_ROOTS from '../../config/routes';
import InvalidArgumentsError from '../../errors/InvalidArguments';
import { getFlattenedPathWithoutRootFolder } from './builders/computedFields/getFlattenedPathWithoutRootFolder';

export {
  DEFAULT_LANGUAGE,
  InvalidArgumentsError,
  POSTS_FOLDER,
  ROUTES_ROOTS,
  capitalize,
  getFlattenedPathWithoutRootFolder,
  indexOfNthOccurrence,
  isValidLanguageFlag,
  pluralize
};
