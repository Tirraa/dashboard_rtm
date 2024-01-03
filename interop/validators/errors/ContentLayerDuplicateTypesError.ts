/* v8 ignore start */
// Stryker disable all
class ContentLayerDuplicateTypesError extends Error {
  constructor(duplicates: unknown[]) {
    super(`[${duplicates.join(', ')}] ${duplicates.length > 1 ? 'are' : 'is'} defined several times.`);
    this.name = 'ContentLayerDuplicateTypesError';
  }
}

export default ContentLayerDuplicateTypesError;
// Stryker restore all
/* v8 ignore stop */
