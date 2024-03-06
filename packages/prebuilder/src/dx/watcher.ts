/* v8 ignore start */
// Stryker disable all

import chokidar from 'chokidar';

import type { Path } from '../types/Metadatas';

let lastEventTimestamp: number | null = null;

const DEBOUNCE_THRESHOLD = 10;

function handleEvent(callback: () => void) {
  const currentTimestamp = Date.now();

  if (lastEventTimestamp !== null && currentTimestamp - lastEventTimestamp < DEBOUNCE_THRESHOLD) return;

  lastEventTimestamp = currentTimestamp;
  callback();
}

function watcher(folderPath: Path, callback: () => void): void {
  const watcher = chokidar.watch(folderPath, { ignoreInitial: true, persistent: true });

  watcher.on('all', () => {
    handleEvent(callback);
  });
}

export default watcher;

// Stryker restore all
/* v8 ignore stop */
