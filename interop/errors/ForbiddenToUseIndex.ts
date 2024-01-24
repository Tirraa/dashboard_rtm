import { INDEX_TOKEN } from '../lib/builders/unifiedImport';

class ForbiddenToUseIndexError extends Error {
  constructor() {
    super(`using ${INDEX_TOKEN} here is forbidden.`);
    this.name = 'ForbiddenToUseIndexError';
  }
}

export default ForbiddenToUseIndexError;
