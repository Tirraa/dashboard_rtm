/* v8 ignore start */
import type { MaybeNull } from 'packages/shared-types/src/CustomUtilityTypes';
// Stryker disable all
import type { NextAuthOptions, Session } from 'next-auth';
import type { IDiscordApi } from '@/meta/discordapi';
import type { JWT } from 'next-auth/jwt';

import DiscordProvider from 'next-auth/providers/discord';
import __discordApi from '@/meta/discordapi';

import bentocache, { keysFactory } from '../bentocache';

// {ToDo} Test it! (unit test)
async function getDiscordProfilePicture(sub: string, discordApi: IDiscordApi): Promise<MaybeNull<string>> {
  const freshProfile = await discordApi.getFreshProfile(sub);

  const { avatar, id } = freshProfile;
  if (!avatar || !id) return null;

  const format = avatar.startsWith('a_') ? 'gif' : 'png';
  const imageURL = `https://cdn.discordapp.com/avatars/${id}/${avatar}.${format}`;

  return imageURL;
}

// {ToDo} Test it! (unit test, verify cache)
async function getSession(session: Session, token: JWT, discordApi: IDiscordApi = __discordApi) {
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
  if (!BOT_TOKEN) return session;

  const { sub: id } = token;
  if (!id) return session;

  const imageURL = await bentocache.getOrSet(keysFactory.discordProfilePicture(id), () => getDiscordProfilePicture(id, discordApi), { ttl: '11m' });

  if (imageURL === null) return session;

  return {
    user: { ...session.user, image: imageURL },
    expires: session.expires
  } satisfies Session;
}

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
      return await getSession(session, token);
    }
  },

  pages: {
    signIn: '/sign-up'
  }
};

export default authOptions;
/* v8 ignore stop */
// Stryker restore all
