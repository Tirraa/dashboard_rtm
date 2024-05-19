import type { AuthorName, Authors, Author } from '##/config/contentlayer/blog/authors';
import type { MaybeUndefined, MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { Href } from '@rtm/shared-types/Next';

import type { InvalidBlogTag } from '../../../unifiedImport';

import { BlogAuthorDuplicates, InvalidBlogAuthor, BULLET } from '../../../unifiedImport';

function validateAuthorNames<__Authors extends Authors, __Author extends keyof __Authors>(
  authors: __Authors,
  authorsNamesArray: __Author[]
): MaybeNull<InvalidBlogTag> {
  const defects: string[] = [];

  for (const authorName of authorsNamesArray) {
    if (authors[authorName] === undefined) {
      defects.push(authorName as string);
      continue;
    }
  }

  // eslint-disable-next-line no-magic-numbers
  if (defects.length > 0) return new InvalidBlogAuthor(defects, Object.keys(authors));
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
function buildBlogAuthorsFromPostObj<__Authors extends Authors, __Author extends keyof __Authors>(
  authors: __Authors,
  authorsNamesArray: MaybeUndefined<__Author[]>
): AuthorsWithProfileURL {
  if (authorsNamesArray === undefined) return {};
  const authorsNamesArrayUniq = Array.from(new Set<__Author>(authorsNamesArray));

  const maybeValidateAuthorNamesError = validateAuthorNames(authors, authorsNamesArrayUniq);
  const maybeValidateAuthorsNoDuplicatesError = validateAuthorsNoDuplicates(authorsNamesArray as string[]);

  const mergedErrors = [maybeValidateAuthorNamesError, maybeValidateAuthorsNoDuplicatesError].filter((e) => e !== null);

  // eslint-disable-next-line no-magic-numbers
  if (mergedErrors.length > 0) throw mergedErrors.join('\n' + BULLET + ' ');

  const authorsWithProfileUrl = Object.fromEntries(
    Object.entries(authors).map(([key, author]) => {
      (author as AuthorWithProfileURL).profileUrl = `/authors/${key}`;
      if (author.medias === undefined) author.medias = {};
      return [key, author];
    })
  ) as AuthorsWithProfileURL;

  return authorsWithProfileUrl;
}

const buildBlogAuthors = (post: DocumentToCompute, authors: Authors): AuthorsWithProfileURL => buildBlogAuthorsFromPostObj(authors, post.authors);

export default buildBlogAuthors;

type AuthorWithProfileURL = { profileUrl: Href } & Author;
type AuthorsWithProfileURL = Record<AuthorName, AuthorWithProfileURL>;
