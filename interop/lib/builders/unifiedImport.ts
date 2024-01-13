import { LANDING_PAGES_FOLDER, BLOG_POSTS_FOLDER } from '../../config/contentlayer/contentlayerConfigTweakers';
import indexOfNthOccurrence from '../../../src/lib/portable/str/indexOfNthOccurrence';
import getFlattenedPathWithoutRootFolder from './getFlattenedPathWithoutRootFolder';
import capitalize from '../../../src/lib/portable/str/capitalize';
import InvalidArgumentsError from '../../errors/InvalidArguments';
import { DEFAULT_LANGUAGE } from '../../config/i18n';
import ROUTES_ROOTS from '../../config/routes';

export {
  getFlattenedPathWithoutRootFolder,
  InvalidArgumentsError,
  indexOfNthOccurrence,
  LANDING_PAGES_FOLDER,
  BLOG_POSTS_FOLDER,
  DEFAULT_LANGUAGE,
  ROUTES_ROOTS,
  capitalize
};
