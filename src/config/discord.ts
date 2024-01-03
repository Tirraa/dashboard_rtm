/* v8 ignore start */
// Stryker disable all
type TDiscordConfig = {
  SUPPORT_SERVER_INVITE_LINK: string;
  BOT_INVITE_LINK: string;
};

const [CLIENT_ID, PERMISSIONS]: [string, string] = ['1120800430897778700', '8'];
const DISCORD_CONFIG: TDiscordConfig = {
  BOT_INVITE_LINK: `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&permissions=${PERMISSIONS}&scope=bot`,
  SUPPORT_SERVER_INVITE_LINK: 'https://discord.gg/QWTXj3Dv4k'
} as const;

export default DISCORD_CONFIG;
// Stryker restore all
/* v8 ignore stop */
