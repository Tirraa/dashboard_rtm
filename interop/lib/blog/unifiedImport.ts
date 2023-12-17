import getFlattenedPathWithoutRootFolder from './builders/computedFields/getFlattenedPathWithoutRootFolder';
import indexOfNthOccurrence from '../../../src/lib/portable/str/indexOfNthOccurrence';
import { BLOG_POSTS_FOLDER } from '../../config/blog/contentlayerConfigTweakers';
import capitalize from '../../../src/lib/portable/str/capitalize';
import InvalidArgumentsError from '../../errors/InvalidArguments';
import { DEFAULT_LANGUAGE } from '../../config/i18n';
import ROUTES_ROOTS from '../../config/routes';

export {
  getFlattenedPathWithoutRootFolder,
  InvalidArgumentsError,
  indexOfNthOccurrence,
  BLOG_POSTS_FOLDER,
  DEFAULT_LANGUAGE,
  ROUTES_ROOTS,
  capitalize
};
