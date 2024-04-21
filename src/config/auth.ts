import type { NextAuthConfig } from 'next-auth';

import Discord from 'next-auth/providers/discord';
import { getSession } from '@/auth';

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
  }
} as const satisfies NextAuthConfig;

export default config;
