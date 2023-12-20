/* v8 ignore start */
import authOptions from '@/config/Auth/authOptions';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
/* v8 ignore stop */
