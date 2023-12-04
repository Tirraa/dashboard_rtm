import isValidLanguageFlag from '../../../src/lib/portable/i18n/isValidLanguageFlag';
import capitalize from '../../../src/lib/portable/str/capitalize';
import indexOfNthOccurrence from '../../../src/lib/portable/str/indexOfNthOccurrence';
import pluralize from '../../../src/lib/portable/str/pluralize';
import { DEFAULT_LANGUAGE } from '../../config/i18n';
import ROUTES_ROOTS from '../../config/routes';
import InvalidArgumentsError from '../../errors/InvalidArguments';
import { POSTS_FOLDER } from '../../types/ContentlayerConfigTweakers';
import getFlattenedPathWithoutRootFolder from './builders/computedFields/getFlattenedPathWithoutRootFolder';

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
