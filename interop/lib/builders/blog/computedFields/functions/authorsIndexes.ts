import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Index } from '@rtm/shared-types/Numbers';

import { BlogAuthorDuplicates, InvalidBlogAuthor, BULLET } from '../../../unifiedImport';

function validateAuthorNames<AuthorName extends string>(
  authorsNamesArrayUniq: AuthorName[],
  indexedAuthorsNames: Record<AuthorName, Index>,
  authorsNames: readonly AuthorName[]
): MaybeNull<InvalidBlogAuthor> {
  const defects: string[] = [];

  for (const authorName of authorsNamesArrayUniq) {
    if (indexedAuthorsNames[authorName] === undefined) {
      defects.push(authorName);
      continue;
    }
  }

  // eslint-disable-next-line no-magic-numbers
  if (defects.length > 0) return new InvalidBlogAuthor(defects, authorsNames);
  return null;
}

function validateAuthorsNoDuplicates(authorsNamesArray: string[]): MaybeNull<BlogAuthorDuplicates> {
  const authorsMemory: unknown[] = [];
  const duplicatesSet = new Set<unknown>();

  for (const currentName of authorsNamesArray) {
    if (authorsMemory.includes(currentName)) {
      duplicatesSet.add(currentName);
      continue;
    }
    authorsMemory.push(currentName);
  }

  const duplicates = Array.from(duplicatesSet);
  // eslint-disable-next-line no-magic-numbers
  if (duplicates.length > 0) return new BlogAuthorDuplicates(duplicates);
  return null;
}

/**
 * @throws {[InvalidBlogAuthor, BlogAuthorDuplicates]}
 */
function buildBlogAuthorsFromPostObj<AuthorName extends string>(
  authorsNamesArray: AuthorName[],
  indexedAuthorsNames: Record<AuthorName, Index>,
  authorsNames: readonly AuthorName[]
): Index[] {
  const authorsNamesArrayUniq = Array.from(new Set<AuthorName>(authorsNamesArray));

  const maybeValidateAuthorNamesError = validateAuthorNames(authorsNamesArrayUniq, indexedAuthorsNames, authorsNames);
  const maybeValidateAuthorsNoDuplicatesError = validateAuthorsNoDuplicates(authorsNamesArray as string[]);

  const mergedErrors = [maybeValidateAuthorNamesError, maybeValidateAuthorsNoDuplicatesError].filter((e) => e !== null);

  // eslint-disable-next-line no-magic-numbers
  if (mergedErrors.length > 0) throw mergedErrors.join('\n' + BULLET + ' ');

  const res: Index[] = [];
  for (const authorName of authorsNamesArrayUniq) res.push(indexedAuthorsNames[authorName]);

  return res;
}

const buildBlogAuthorsIndexes = <AuthorName extends string>(
  post: DocumentToCompute,
  indexedAuthorsNames: Record<AuthorName, Index>,
  authorsNames: readonly AuthorName[]
): Index[] => buildBlogAuthorsFromPostObj(post.authors._array as AuthorName[], indexedAuthorsNames, authorsNames);

export default buildBlogAuthorsIndexes;
