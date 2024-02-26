import type { Path } from '../types/Metadatas';

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs/promises');

async function fileExists(path: Path) {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
}

export default fileExists;
