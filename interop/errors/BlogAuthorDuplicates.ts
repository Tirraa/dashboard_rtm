/* v8 ignore start */
// Stryker disable all

class BlogAuthorDuplicates extends Error {
  constructor(duplicates: unknown[]) {
    // eslint-disable-next-line no-magic-numbers
    const prefix = duplicates.length > 1 ? `[“${duplicates.join('”, “')}”]` : `“${duplicates[0]}”`;
    // eslint-disable-next-line no-magic-numbers
    const verb = duplicates.length > 1 ? 'are' : 'is';
    super(prefix + ' ' + verb + ' ' + 'defined several times.');
    this.name = 'BlogAuthorDuplicatesError';
  }
}

export default BlogAuthorDuplicates;

// Stryker restore all
/* v8 ignore stop */
