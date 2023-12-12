import isValidLanguageFlag from '../../../src/lib/portable/i18n/isValidLanguageFlag';
import capitalize from '../../../src/lib/portable/str/capitalize';
import indexOfNthOccurrence from '../../../src/lib/portable/str/indexOfNthOccurrence';
import { BLOG_POSTS_FOLDER } from '../../config/blog/contentlayerConfigTweakers';
import { DEFAULT_LANGUAGE } from '../../config/i18n';
import ROUTES_ROOTS from '../../config/routes';
import InvalidArgumentsError from '../../errors/InvalidArguments';
import getFlattenedPathWithoutRootFolder from './builders/computedFields/getFlattenedPathWithoutRootFolder';

export {
  BLOG_POSTS_FOLDER,
  DEFAULT_LANGUAGE,
  InvalidArgumentsError,
  ROUTES_ROOTS,
  capitalize,
  getFlattenedPathWithoutRootFolder,
  indexOfNthOccurrence,
  isValidLanguageFlag
};
