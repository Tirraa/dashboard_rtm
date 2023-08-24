const [client_id, permissions]: [string, string] = ['1120800430897778700', '8'];

export namespace DiscordConfig {
  export const botInviteLink = `https://discord.com/api/oauth2/authorize?client_id=${client_id}&permissions=${permissions}&scope=bot`;
  export const supportServerInviteLink = 'https://discord.gg/QWTXj3Dv4k';
}

export default DiscordConfig;
