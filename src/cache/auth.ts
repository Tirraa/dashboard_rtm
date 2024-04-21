import type { MaybeUndefined } from '@rtm/shared-types/CustomUtilityTypes';
import type { MsTimestamp, MsValue } from '@rtm/shared-types/Numbers';

namespace AuthCache {
  export const data = {} as DataCache;
}

export const keysFactory = {
  discordProfilePicture: (id: string) => `discord:pp:${id}`
};

function invalidateExpiredCacheData(key: string) {
  if (AuthCache.data[key] === undefined) return;

  const clock = AuthCache.data[key].clock;
  if (!clock) return;

  const { cachedAt, ttl } = clock;
  if (Math.abs(Date.now() - cachedAt) > ttl) delete AuthCache.data[key];
}

export function get(key: string) {
  invalidateExpiredCacheData(key);
  return AuthCache.data[key]?.value;
}

export function set(key: string, data: Data, ttl: MsValue) {
  function setClock(key: string, ttl: MsValue) {
    AuthCache.data[key].clock = {
      cachedAt: Date.now(),
      ttl
    };
  }

  if (!AuthCache.data[key]) AuthCache.data[key] = {} as DataCacheEntry;

  AuthCache.data[key].value = typeof data === 'object' ? structuredClone(data) : data;

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (ttl > 0) setClock(key, ttl);
}

export async function getOrSet(key: string, data: () => Promise<Data>, ttl: MsValue) {
  const value: MaybeUndefined<Data> = get(key);
  if (value !== undefined) return value;

  const mountedData = await data();
  set(key, mountedData, ttl);
  return get(key);
}

export function clearAll() {
  for (const key of Object.keys(AuthCache.data)) delete AuthCache.data[key];
}

type Data = boolean | string | number | object | null;

type Clock = { cachedAt: MsTimestamp; ttl: MsValue };

type DataCacheEntry = {
  clock: Clock;
  value: Data;
};

type DataCache = Record<PropertyKey, DataCacheEntry>;
