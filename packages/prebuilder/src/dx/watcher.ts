/* v8 ignore start */
// Stryker disable all

import type { MsTimestamp, MsValue } from '@rtm/shared-types/Numbers';

import { watch } from 'chokidar';

import type { Path } from '../types/Metadatas';

let lastEventTimestamp: MsTimestamp | null = null;

const DEBOUNCE_THRESHOLD_IN_MS: MsValue = 10;

function handleEvent(callback: () => void) {
  const currentTimestamp = Date.now();

  if (lastEventTimestamp !== null && currentTimestamp - lastEventTimestamp < DEBOUNCE_THRESHOLD_IN_MS) return;

  lastEventTimestamp = currentTimestamp;
  callback();
}

function watcher(folderPath: Path, callback: () => void): void {
  const watcher = watch(folderPath, { ignoreInitial: true, persistent: true });

  watcher.on('all', () => {
    handleEvent(callback);
  });
}

export default watcher;

// Stryker restore all
/* v8 ignore stop */
