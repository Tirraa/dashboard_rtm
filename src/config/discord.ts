/* v8 ignore start */
// Stryker disable all

import type { Href } from '@rtm/shared-types/Next';

type DiscordConfigType = {
  SUPPORT_SERVER_INVITE_LINK: Href;
  BOT_INVITE_LINK: Href;
};

const [CLIENT_ID, PERMISSIONS]: [string, string] = ['1120800430897778700', '8'];
const DISCORD_CONFIG: DiscordConfigType = {
  BOT_INVITE_LINK: `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&permissions=${PERMISSIONS}&scope=bot`,
  SUPPORT_SERVER_INVITE_LINK: 'https://discord.gg/QWTXj3Dv4k'
} as const;

export default DISCORD_CONFIG;

// Stryker restore all
/* v8 ignore stop */
