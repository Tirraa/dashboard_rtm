import type { IDiscordApi } from '@/meta/discordapi';

import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { keysFactory, clearAll, get, set } from '@/cache/auth';
import { getDiscordProfilePicture, getSession } from '@/auth';
import discordApi from '@/meta/discordapi';

describe('getDiscordProfilePicture (rate limited)', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(() => {
      throw new Error('Rate limit');
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    clearAll();
  });

  it('should cache a fallback ImageURL, given unhappy path (all is valid, but we got rate limited and empty cache)', async () => {
    vi.stubEnv('DISCORD_BOT_TOKEN', 'FAKE');

    const FAKE_ID = 'FAKE_ID';
    const fakeDiscordApi: IDiscordApi = discordApi;

    const session = {
      user: {
        email: 'foo@bar.baz',
        name: 'foo'
      },
      expires: new Date().toString()
    };

    const gotSession = await getSession(session, fakeDiscordApi);

    const cachedURL = get(keysFactory.discordProfilePicture(FAKE_ID));
    const fallbackAvatarRegex = /^https:\/\/cdn\.discordapp\.com\/embed\/avatars\/[0-5]\.png$/;

    expect(cachedURL).toMatch(fallbackAvatarRegex);
    expect(gotSession).toStrictEqual({
      user: { ...session.user, image: gotSession?.user?.image },
      expires: session.expires
    });
  });

  it('should return the cached ImageURL as fallback, given unhappy path (all is valid, but we got rate limited)', async () => {
    vi.stubEnv('DISCORD_BOT_TOKEN', 'FAKE');
    set(keysFactory.discordProfilePicture('FAKE_ID'), 'FAKE_URL', Number.MAX_SAFE_INTEGER);

    const FAKE_ID = 'FAKE_ID';
    const fakeDiscordApi: IDiscordApi = discordApi;

    const session = {
      user: {
        email: 'foo@bar.baz',
        name: 'foo'
      },
      expires: new Date().toString()
    };

    const gotSession = await getSession(session, fakeDiscordApi);

    const cachedURL = get(keysFactory.discordProfilePicture(FAKE_ID));

    expect(cachedURL).toBe('FAKE_URL');
    expect(gotSession).toStrictEqual({
      user: { ...session.user, image: gotSession?.user?.image },
      expires: session.expires
    });
  });
});

describe('getDiscordProfilePicture', () => {
  it('should return a PNG Discord avatar URL, given a plain avatar/id couple', async () => {
    const fakeDiscordApi: IDiscordApi = {
      // eslint-disable-next-line require-await
      getFreshProfile: async () => {
        return {
          avatar: 'FAKE_AVATAR',
          id: 'FAKE_ID'
        };
      }
    };
    const profilePicture = await getDiscordProfilePicture('FAKE_ID', fakeDiscordApi);
    expect(profilePicture).toBe('https://cdn.discordapp.com/avatars/FAKE_ID/FAKE_AVATAR.png');
  });

  it('should return a GIF Discord avatar URL, given an avatar field starting with "a_"', async () => {
    const fakeDiscordApi: IDiscordApi = {
      // eslint-disable-next-line require-await
      getFreshProfile: async () => {
        return {
          avatar: 'a_FAKE_AVATAR',
          id: 'FAKE_ID'
        };
      }
    };
    const profilePicture = await getDiscordProfilePicture('FAKE_ID', fakeDiscordApi);
    expect(profilePicture).toBe('https://cdn.discordapp.com/avatars/FAKE_ID/a_FAKE_AVATAR.gif');
  });

  it('should return null, given empty avatar field', async () => {
    const fakeDiscordApi: IDiscordApi = {
      // eslint-disable-next-line require-await
      getFreshProfile: async () => {
        return {
          id: 'FAKE_ID',
          avatar: ''
        };
      }
    };
    const profilePicture = await getDiscordProfilePicture('FAKE_ID', fakeDiscordApi);
    expect(profilePicture).toBe(null);
  });

  it('should return null, given empty id field', async () => {
    const fakeDiscordApi: IDiscordApi = {
      // eslint-disable-next-line require-await
      getFreshProfile: async () => {
        return {
          avatar: 'FAKE_AVATAR',
          id: ''
        };
      }
    };
    const profilePicture = await getDiscordProfilePicture('FAKE_ID', fakeDiscordApi);
    expect(profilePicture).toBe(null);
  });

  it('should return null, given both empty id and avatar fields', async () => {
    const fakeDiscordApi: IDiscordApi = {
      // eslint-disable-next-line require-await
      getFreshProfile: async () => {
        return {
          avatar: '',
          id: ''
        };
      }
    };
    const profilePicture = await getDiscordProfilePicture('FAKE_ID', fakeDiscordApi);
    expect(profilePicture).toBe(null);
  });
});

describe('Caching test', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    clearAll();
    vi.resetModules();
  });

  it('should cache the ImageURL, given happy path', async () => {
    vi.stubEnv('DISCORD_BOT_TOKEN', 'FAKE');

    const FAKE_ID = 'FAKE_ID';
    const fakeDiscordApi: IDiscordApi = {
      // eslint-disable-next-line require-await
      getFreshProfile: async () => {
        return {
          avatar: 'a_FAKE_AVATAR',
          id: FAKE_ID
        };
      }
    };

    const session = {
      user: {
        email: 'foo@bar.baz',
        name: 'foo'
      },
      expires: new Date().toString()
    };

    const gotSession = await getSession(session, fakeDiscordApi);

    const cachedURL = get(keysFactory.discordProfilePicture(FAKE_ID));
    expect(cachedURL).toBe('https://cdn.discordapp.com/avatars/FAKE_ID/a_FAKE_AVATAR.gif');
    expect(gotSession).toStrictEqual({
      user: { ...session.user, image: gotSession?.user?.image },
      expires: session.expires
    });
  });

  it('should return session as is, given unhappy path (undefined DISCORD_BOT_TOKEN)', async () => {
    vi.stubEnv('DISCORD_BOT_TOKEN', '');

    const FAKE_ID = 'FAKE_ID';
    const fakeDiscordApi: IDiscordApi = {
      // eslint-disable-next-line require-await
      getFreshProfile: async () => {
        return {
          avatar: 'a_FAKE_AVATAR',
          id: FAKE_ID
        };
      }
    };

    const session = {
      user: {
        email: 'foo@bar.baz',
        name: 'foo'
      },
      expires: new Date().toString()
    };

    const gotSession = await getSession(session, fakeDiscordApi);

    const cachedURL = get(keysFactory.discordProfilePicture(FAKE_ID));
    expect(cachedURL).toBe(undefined);
    expect(gotSession).toStrictEqual(session);
  });

  it('should return session as is, given unhappy path (undefined sub)', async () => {
    vi.stubEnv('DISCORD_BOT_TOKEN', 'FAKE');

    const FAKE_ID = 'FAKE_ID';
    const fakeDiscordApi: IDiscordApi = {
      // eslint-disable-next-line require-await
      getFreshProfile: async () => {
        return {
          avatar: 'a_FAKE_AVATAR',
          id: FAKE_ID
        };
      }
    };

    const session = {
      user: {
        email: 'foo@bar.baz',
        name: 'foo'
      },
      expires: new Date().toString()
    };

    const gotSession = await getSession(session, fakeDiscordApi);

    const cachedURL = get(keysFactory.discordProfilePicture(FAKE_ID));
    expect(cachedURL).toBe(undefined);
    expect(gotSession).toStrictEqual(session);
  });

  it('should return session as is, given unhappy path (failed to get imageURL)', async () => {
    vi.stubEnv('DISCORD_BOT_TOKEN', 'FAKE');

    const FAKE_ID = 'FAKE_ID';
    const fakeDiscordApi: IDiscordApi = {
      // eslint-disable-next-line require-await
      getFreshProfile: async () => {
        return {
          avatar: '',
          id: ''
        };
      }
    };

    const session = {
      user: {
        email: 'foo@bar.baz',
        name: 'foo'
      },
      expires: new Date().toString()
    };

    const gotSession = await getSession(session, fakeDiscordApi);

    const cachedURL = get(keysFactory.discordProfilePicture(FAKE_ID));
    expect(cachedURL).toBe(undefined);
    expect(gotSession).toStrictEqual(session);
  });
});
