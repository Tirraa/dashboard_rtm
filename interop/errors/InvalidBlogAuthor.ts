import type { AuthorName } from '##/config/contentlayer/blog/authors';

import { TAB_SIZE } from '../lib/misc/contentlayerCornerCases';

type InvalidAuthor = string;

class InvalidBlogAuthor extends Error {
  constructor(invalidBlogAuthors: InvalidAuthor[], validAuthorsNames: readonly AuthorName[]) {
    // eslint-disable-next-line no-magic-numbers
    const author = invalidBlogAuthors.length === 1 ? 'author' : 'authors';

    const invalidAuthor =
      // eslint-disable-next-line no-magic-numbers
      invalidBlogAuthors.length > 1
        ? `Invalid ${author}: [“${invalidBlogAuthors.join('”, “')}”]`
        : // eslint-disable-next-line no-magic-numbers
          `Invalid ${author}: “${invalidBlogAuthors[0]}”`;

    const validAuthor =
      // eslint-disable-next-line no-magic-numbers
      validAuthorsNames.length > 1
        ? `Valid authors are: [“${validAuthorsNames.join('”, “')}”]`
        : // eslint-disable-next-line no-magic-numbers
          `Valid author is: “${validAuthorsNames[0]}”`;

    const message = invalidAuthor + '\n' + ' '.repeat(TAB_SIZE) + validAuthor;
    super(message);
    this.name = 'InvalidBlogAuthorError';
  }
}

export default InvalidBlogAuthor;
