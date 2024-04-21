import type { NextAuthConfig } from 'next-auth';

import Discord from 'next-auth/providers/discord';
import { getSession } from '@/auth';

// eslint-disable-next-line
const AUTH_SECRETS_SEP = ';;;;;;';

// const secret = process.env.AUTH_SECRETS!.split(AUTH_SECRETS_SEP);
// {ToDo} Find a way to fix this
// See also: https://github.com/nextauthjs/next-auth/issues/10633
const secret = 'huuuummmmm';

const config = {
  providers: [
    Discord({
      authorization: {
        params: {
          scope: 'identify+guilds'
        }
      },
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
      clientId: process.env.DISCORD_CLIENT_ID ?? ''
    })
  ],

  callbacks: {
    async session({ session }) {
      const s = await getSession(session);
      return s;
    }
  },

  secret
} as const satisfies NextAuthConfig;

export default config;
