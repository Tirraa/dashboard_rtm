/* v8 ignore start */
// Stryker disable all

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Href } from '@rtm/shared-types/Next';

import { keysFactory, get } from '@/cache/generic';

type FreshProfile = { epicFail?: boolean; avatar: string; id: string };

export interface IDiscordApi {
  getFreshProfile(sub: string): Promise<FreshProfile>;
}

const MAX_DEFAULT_AVATAR_ID = 6;

class DiscordApi implements IDiscordApi {
  async getFreshProfile(sub: string): Promise<FreshProfile> {
    try {
      return await (
        await fetch(`https://discord.com/api/v10/users/${sub}`, {
          headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
          method: 'GET'
        })
      ).json();
    } catch {
      const cachedURL = get(keysFactory.discordProfilePicture(sub)) as MaybeNull<Href>;
      if (cachedURL) return { avatar: cachedURL, id: sub };
      const randint = Math.floor(Math.random() * MAX_DEFAULT_AVATAR_ID);
      return { avatar: `https://cdn.discordapp.com/embed/avatars/${randint}.png`, epicFail: true, id: sub };
    }
  }
}

const DISCORD_API = new DiscordApi();
export default DISCORD_API;

// Stryker restore all
/* v8 ignore stop */
