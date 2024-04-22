import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { NextAuthOptions, Session } from 'next-auth';
import type { IDiscordApi } from '@/meta/discordapi';
import type { Href } from '@rtm/shared-types/Next';
import type { JWT } from 'next-auth/jwt';

import DiscordProvider from 'next-auth/providers/discord';
import { keysFactory, getOrSet } from '@/cache/generic';
import ROUTES_ROOTS from '##/config/routes';
import discordApi from '@/meta/discordapi';

export async function getDiscordProfilePicture(sub: string, __discordApi: IDiscordApi): Promise<MaybeNull<string>> {
  const freshProfile = await __discordApi.getFreshProfile(sub);

  const { epicFail, avatar, id } = freshProfile;
  if (!avatar || !id) return null;
  if (epicFail) return avatar;

  const format = avatar.startsWith('a_') ? 'gif' : 'png';
  const imageURL = `https://cdn.discordapp.com/avatars/${id}/${avatar}.${format}`;

  return imageURL;
}

export async function getSession(session: Session, token: JWT, __discordApi: IDiscordApi = discordApi) {
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
  if (!BOT_TOKEN) return session;

  const { sub: id } = token;
  if (!id) return session;

  // Stryker Workaround 1. Empty object mutant is pointless.
  // Stryker disable next-line ObjectLiteral
  const imageURL = (await getOrSet(
    keysFactory.discordProfilePicture(id),
    () => getDiscordProfilePicture(id, __discordApi),
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    660_000
  )) as MaybeNull<Href>; // TTL: https://discord.com/developers/docs/topics/rate-limits#invalid-request-limit-aka-cloudflare-bans

  if (imageURL === null) return session;

  return {
    user: { ...session.user, image: imageURL },
    expires: session.expires
  } satisfies Session;
}

/* v8 ignore start */
// Stryker disable all

const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      authorization: 'https://discord.com/api/oauth2/authorize?scope=guilds+identify',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
      clientId: process.env.DISCORD_CLIENT_ID ?? ''
    })
  ],

  callbacks: {
    async session({ session, token }) {
      const s = await getSession(session, token);
      return s;
    }
  },

  pages: {
    signIn: ROUTES_ROOTS.LANDING_PAGES + 'sign-up'
  }
};

export default authOptions;

// Stryker restore all
/* v8 ignore stop */
