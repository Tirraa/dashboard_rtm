/* v8 ignore start */
// Stryker disable all

import type { Quantity } from '@rtm/shared-types/Numbers';

import PAGEFIND_CONFIG from '@/config/pagefind';

export async function initPagefind() {
  if (typeof window.pagefind === 'undefined') return;
  await window.pagefind.init();
}

async function preloadPagefind(req: string, minReqLengthToTriggerPreload: Quantity) {
  if (typeof window.pagefind === 'undefined') return;
  if (req.length < minReqLengthToTriggerPreload) return;
  await window.pagefind.preload(req);
}

export function tryToInitPagefind() {
  try {
    initPagefind();
  } catch {}
}

export function tryToPreloadPagefind(
  req: string,
  minReqLengthToTriggerPreload: Quantity = PAGEFIND_CONFIG.DEFAULT_MIN_REQ_LENGTH_TO_TRIGGER_PRELOAD
) {
  try {
    preloadPagefind(req, minReqLengthToTriggerPreload);
  } catch {}
}

// Stryker restore all
/* v8 ignore stop */
