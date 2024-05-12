import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { MaybeUndefined } from '@rtm/shared-types/CustomUtilityTypes';
import type { Path } from '@rtm/shared-types/Next';

// eslint-disable-next-line import/no-extraneous-dependencies
import mime from 'mime-types';
import path from 'path';
import fs from 'fs';

import { buildAbsolutePathFromParts } from '../../../unifiedImport';

function computeFilePath(filepath: Path) {
  const PUBLIC_FOLDER_NEEDLE = '/public';

  const right = !filepath.startsWith(PUBLIC_FOLDER_NEEDLE) ? buildAbsolutePathFromParts(PUBLIC_FOLDER_NEEDLE, filepath) : filepath;

  const left = path.posix.normalize(process.cwd());
  const normalizedPath = path.normalize(buildAbsolutePathFromParts(left, right));

  return normalizedPath;
}

function generateDataURLFromFile(filepath: Path): string {
  const _filepath = computeFilePath(filepath);

  if (!fs.existsSync(_filepath)) throw new Error('File not found: ' + _filepath);
  const mimeType: string | false = mime.lookup(_filepath);

  if (!mimeType || !mimeType.startsWith('image/')) throw new Error('Not an image: ' + _filepath);

  const data: Buffer = fs.readFileSync(_filepath);
  const base64Data: string = data.toString('base64');
  const dataURL: string = `data:${mimeType};base64,${base64Data}`;

  return dataURL;
}

function buildFeaturedPictureBlurPlaceholderDataUrl(post: DocumentToCompute): MaybeUndefined<string> {
  if (post.featuredPictureBlurPlaceholderUrl === undefined) return undefined;
  return generateDataURLFromFile(post.featuredPictureBlurPlaceholderUrl);
}

export default buildFeaturedPictureBlurPlaceholderDataUrl;
