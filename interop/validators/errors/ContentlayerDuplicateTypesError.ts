/* v8 ignore start */
// Stryker disable all

class ContentlayerDuplicateTypesError extends Error {
  constructor(duplicates: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    super(`[${duplicates.join(', ')}] ${duplicates.length > 1 ? 'are' : 'is'} defined several times.`);
    this.name = 'ContentlayerDuplicateTypesError';
  }
}

export default ContentlayerDuplicateTypesError;

// Stryker restore all
/* v8 ignore stop */
