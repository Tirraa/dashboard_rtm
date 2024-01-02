/* v8 ignore start */
// Stryker disable all
import bentocache, { keysFactory } from '@/config/bentocache';

type FreshProfile = { epicFail?: boolean; avatar: string; id: string };

export interface IDiscordApi {
  getFreshProfile(sub: string): Promise<FreshProfile>;
}

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
      const cachedURL = await bentocache.get(keysFactory.discordProfilePicture(sub));
      if (cachedURL) return { avatar: cachedURL, id: sub };
      const randint = Math.floor(Math.random() * 6);
      return { avatar: `https://cdn.discordapp.com/embed/avatars/${randint}.png`, epicFail: true, id: sub };
    }
  }
}

const DISCORD_API = new DiscordApi();
export default DISCORD_API;
/* v8 ignore stop */
// Stryker restore all
