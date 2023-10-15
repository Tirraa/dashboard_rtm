import type { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/sign-up'
  },

  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
      authorization: 'https://discord.com/api/oauth2/authorize?scope=guilds+identify'
    })
  ]
};

export default authOptions;
