type FreshProfile = { avatar: string; id: string };

export interface IDiscordApi {
  getFreshProfile(sub: string): Promise<FreshProfile>;
}

class DiscordApi implements IDiscordApi {
  async getFreshProfile(sub: string): Promise<FreshProfile> {
    return await (
      await fetch(`https://discord.com/api/v10/users/${sub}`, {
        headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
        method: 'GET'
      })
    ).json();
  }
}

const DISCORD_API = new DiscordApi();
export default DISCORD_API;
