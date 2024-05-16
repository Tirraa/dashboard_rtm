import type { MaybeUndefined } from '@rtm/shared-types/CustomUtilityTypes';
import type { MsTimestamp, MsValue } from '@rtm/shared-types/Numbers';

// * ... Inspired from https://github.com/Julien-R44/bentocache

namespace GenericInMemoryCache {
  export const data = {} as DataCache;
}

export const keysFactory = {
  discordProfilePicture: (id: string) => `discord:pp:${id}`
};

function invalidateExpiredCacheData(key: string) {
  if (GenericInMemoryCache.data[key] === undefined) return;

  const clock = GenericInMemoryCache.data[key].clock;
  if (!clock) return;

  const { cachedAt, ttl } = clock;
  if (Math.abs(Date.now() - cachedAt) > ttl) delete GenericInMemoryCache.data[key];
}

export function get(key: string) {
  invalidateExpiredCacheData(key);
  return GenericInMemoryCache.data[key]?.value;
}

// eslint-disable-next-line no-magic-numbers
export function set(key: string, data: Data, ttl: MsValue = 0) {
  function setClock(key: string, ttl: MsValue) {
    GenericInMemoryCache.data[key].clock = {
      cachedAt: Date.now(),
      ttl
    };
  }

  // v8 ignore start
  // Stryker disable all
  function disposeClock(key: string) {
    // @ts-expect-error - IDGAF lemme manipulate the RAM
    GenericInMemoryCache.data[key].clock = undefined;
  }
  // Stryker restore all
  // v8 ignore stop

  if (!GenericInMemoryCache.data[key]) GenericInMemoryCache.data[key] = {} as DataCacheEntry;

  GenericInMemoryCache.data[key].value = typeof data === 'object' ? structuredClone(data) : data;

  // eslint-disable-next-line no-magic-numbers
  if (ttl > 0) setClock(key, ttl);
  // eslint-disable-next-line no-magic-numbers
  else if (ttl < 0) disposeClock(key);
}

// eslint-disable-next-line no-magic-numbers
export async function getOrSet(key: string, data: () => Promise<Data>, ttl: MsValue = 0) {
  const value: MaybeUndefined<Data> = get(key);
  if (value !== undefined) return value;

  const mountedData = await data();
  set(key, mountedData, ttl);
  return get(key);
}

export function clearAll() {
  for (const key of Object.keys(GenericInMemoryCache.data)) delete GenericInMemoryCache.data[key];
}

type Data = boolean | string | number | object | null;

type Clock = { cachedAt: MsTimestamp; ttl: MsValue };

type DataCacheEntry = {
  clock: Clock;
  value: Data;
};

type DataCache = Record<PropertyKey, DataCacheEntry>;
