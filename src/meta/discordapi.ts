/* v8 ignore start */
// Stryker disable all

import { keysFactory, get } from '@/cache/auth';

type FreshProfile = { epicFail?: boolean; avatar: string; id: string };

export interface IDiscordApi {
  getFreshProfile(sub: string): Promise<FreshProfile>;
}

const MAX_DEFAULT_AVATAR_ID = 6;

class DiscordApi implements IDiscordApi {
  async getFreshProfile(sub: string): Promise<FreshProfile> {
    try {
      const req = await fetch(`https://discord.com/api/v10/users/${sub}`, {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN as string}`
        },
        method: 'GET'
      });

      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (400 <= req.status && req.status <= 599) throw new Error('Discord API error');

      const response = await req.json();
      return response;
    } catch {
      const cachedURL = get(keysFactory.discordProfilePicture(sub));
      if (cachedURL) return { avatar: cachedURL as string, id: sub };

      const randint = Math.floor(Math.random() * MAX_DEFAULT_AVATAR_ID);
      return {
        avatar: `https://cdn.discordapp.com/embed/avatars/${randint}.png`,
        epicFail: true,
        id: sub
      };
    }
  }
}

const DISCORD_API = new DiscordApi();
export default DISCORD_API;

// Stryker restore all
/* v8 ignore stop */
