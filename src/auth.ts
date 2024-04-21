import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { IDiscordApi } from '@/meta/discordapi';
import type { Href } from '@rtm/shared-types/Next';
import type { Session } from 'next-auth';

import { keysFactory, getOrSet } from '@/cache/auth';
import discordApi from '@/meta/discordapi';
import config from '@/config/auth';
import NextAuth from 'next-auth';

export async function getDiscordProfilePicture(sub: string, __discordApi: IDiscordApi): Promise<MaybeNull<Href>> {
  const freshProfile = await __discordApi.getFreshProfile(sub);

  const { epicFail, avatar, id } = freshProfile;
  if (!avatar || !id) return null;
  if (epicFail) return avatar;

  const format = avatar.startsWith('a_') ? 'gif' : 'png';
  const imageURL = `https://cdn.discordapp.com/avatars/${id}/${avatar}.${format}`;

  return imageURL;
}

const getIdFromImageURL = (rawURL: Href) => {
  if (!rawURL) return '';

  const url = new URL(rawURL);
  const segments = url.pathname.split('/');
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const id = segments[2];
  return id;
};

export async function getSession(session: Session, __discordApi: IDiscordApi = discordApi) {
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
  if (!BOT_TOKEN) return session;

  const id = getIdFromImageURL(session.user?.image ?? '');
  if (!id) return session;

  const imageURL = await getOrSet(
    keysFactory.discordProfilePicture(id),
    () => getDiscordProfilePicture(id, __discordApi),
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    660_000
  ); // TTL: https://discord.com/developers/docs/topics/rate-limits#invalid-request-limit-aka-cloudflare-bans

  if (imageURL === null) return session;

  return {
    user: { ...session.user, image: imageURL as Href },
    expires: session.expires
  } satisfies Session;
}

const { handlers, auth } = NextAuth(config);
export { handlers, auth };
