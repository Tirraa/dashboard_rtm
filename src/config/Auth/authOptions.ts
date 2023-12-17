import type { NextAuthOptions } from 'next-auth';

import DiscordProvider from 'next-auth/providers/discord';

const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      authorization: 'https://discord.com/api/oauth2/authorize?scope=guilds+identify',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
      clientId: process.env.DISCORD_CLIENT_ID ?? ''
    })
  ],

  pages: {
    signIn: '/sign-up'
  }
};

export default authOptions;
