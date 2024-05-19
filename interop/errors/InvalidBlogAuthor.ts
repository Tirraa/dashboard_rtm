import type { AuthorName } from '##/config/contentlayer/blog/authors';

import { TAB_SIZE } from '../lib/misc/contentlayerCornerCases';

type InvalidAuthor = string;

class InvalidBlogAuthor extends Error {
  constructor(invalidBlogAuthors: InvalidAuthor[], validAuthorsNames: readonly AuthorName[]) {
    const invalidAuthorPart =
      // eslint-disable-next-line no-magic-numbers
      invalidBlogAuthors.length > 1
        ? `Invalid authors: [“${invalidBlogAuthors.join('”, “')}”]`
        : // eslint-disable-next-line no-magic-numbers
          `Invalid author: “${invalidBlogAuthors[0]}”`;

    const validAuthorPart =
      // eslint-disable-next-line no-magic-numbers
      validAuthorsNames.length > 1
        ? `Valid authors are: [“${validAuthorsNames.join('”, “')}”]`
        : // eslint-disable-next-line no-magic-numbers
          `Valid author is: “${validAuthorsNames[0]}”`;

    const tab = ' '.repeat(TAB_SIZE);

    const message = invalidAuthorPart + '\n' + tab + validAuthorPart;
    super(message);
    this.name = 'InvalidBlogAuthorError';
  }
}

export default InvalidBlogAuthor;
