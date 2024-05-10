/* v8 ignore start */
// Stryker disable all

class PagefindIntegrationError extends Error {
  constructor(
    message: string,
    options?: {
      cause?: unknown;
      stack?: string;
    }
  ) {
    super(message, { cause: options?.cause });
    this.name = 'PagefindIntegrationError';
    this.stack = options?.stack;
  }
}

export default PagefindIntegrationError;

// Stryker restore all
/* v8 ignore stop */
