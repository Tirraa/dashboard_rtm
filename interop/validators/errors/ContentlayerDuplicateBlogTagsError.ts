/* v8 ignore start */
// Stryker disable all

class ContentlayerDuplicateBlogTagsError extends Error {
  constructor(duplicates: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const prefix = duplicates.length > 1 ? `[“${duplicates.join('”, “')}”]` : `“${duplicates[0]}”`;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const verb = duplicates.length > 1 ? 'are' : 'is';
    super(prefix + ' ' + verb + ' ' + 'defined several times.');
    this.name = 'ContentlayerDuplicateBlogTagsError';
  }
}

export default ContentlayerDuplicateBlogTagsError;

// Stryker restore all
/* v8 ignore stop */
