import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { DocumentType } from 'contentlayer/source-files';

import ContentlayerDuplicateBlogTagsError from './errors/ContentlayerDuplicateBlogTagsError';
import ContentlayerDuplicateTypesError from './errors/ContentlayerDuplicateTypesError';
import { blogTagOptions } from '../../interop/lib/builders/unifiedImport';

const getDocumentTypeName = (documentType: DocumentType<string>) => documentType.def().name;

function validateContentlayerConfigDocumentTypes(documentTypes: DocumentType<string>[]): MaybeNull<ContentlayerDuplicateTypesError> {
  const documentTypesMemory: unknown[] = [];
  const duplicatesSet = new Set<unknown>();

  for (const documentType of documentTypes) {
    const currentType = getDocumentTypeName(documentType);

    if (documentTypesMemory.includes(currentType)) {
      duplicatesSet.add(currentType);
      continue;
    }
    documentTypesMemory.push(currentType);
  }

  const duplicates = Array.from(duplicatesSet);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (duplicates.length > 0) return new ContentlayerDuplicateTypesError(duplicates);
  return null;
}

function validateContentlayerBlogTagsList(__BLOG_TAGS_OPTIONS: readonly string[]): MaybeNull<ContentlayerDuplicateBlogTagsError> {
  const blogTagsMemory: unknown[] = [];
  const duplicatesSet = new Set<unknown>();

  for (const currentTag of __BLOG_TAGS_OPTIONS) {
    if (blogTagsMemory.includes(currentTag)) {
      duplicatesSet.add(currentTag);
      continue;
    }
    blogTagsMemory.push(currentTag);
  }

  const duplicates = Array.from(duplicatesSet);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (duplicates.length > 0) return new ContentlayerDuplicateBlogTagsError(duplicates);
  return null;
}

/**
 * @throws {[ContentlayerDuplicateTypesError, ContentlayerDuplicateBlogTagsError]}
 */
function validateContentlayerConfig(documentTypes: DocumentType<string>[], __BLOG_TAGS_OPTIONS: readonly string[] = blogTagOptions) {
  const maybeDuplicateTypesError = validateContentlayerConfigDocumentTypes(documentTypes);
  const maybeDuplicateBlogTagsError = validateContentlayerBlogTagsList(__BLOG_TAGS_OPTIONS);

  const mergedErrors = [maybeDuplicateTypesError, maybeDuplicateBlogTagsError].filter((e) => e !== null);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (mergedErrors.length > 0) throw mergedErrors;
}

export default validateContentlayerConfig;
