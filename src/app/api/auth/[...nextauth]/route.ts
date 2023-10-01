import NextAuth from 'next-auth';
import authOptions from '@/config/Auth/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
