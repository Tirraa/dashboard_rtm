/* v8 ignore start */
import type { NextAuthOptions, Session } from 'next-auth';

import DiscordProvider from 'next-auth/providers/discord';

const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, token }) {
      try {
        const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
        if (!BOT_TOKEN) return session;

        const { sub: t_id } = token;
        if (!t_id) return session;

        // {ToDo} Cache fresh avatar URL w/ Bento Cache to optimize those stupid fetchs (better call J-R44)
        // https://github.com/Tirraa/dashboard_rtm/issues/66
        const freshProfile = await (
          await fetch(`https://discord.com/api/v10/users/${t_id}`, {
            headers: {
              Authorization: `Bot ${BOT_TOKEN}`
            },
            method: 'GET'
          })
        ).json();

        const { avatar: f_avatar, id: f_id } = freshProfile;
        if (!f_avatar || !f_id) return session;

        const format = f_avatar.startsWith('a_') ? 'gif' : 'png';

        return {
          user: { ...session.user, image: `https://cdn.discordapp.com/avatars/${f_id}/${f_avatar}.${format}` },
          expires: session.expires
        } satisfies Session;
      } catch {}
      return session;
    }
  },

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
/* v8 ignore stop */
