import { getMaybeI18nFlagFromRequest } from '@/lib/next';
import { getSlashEnvelope } from '@/lib/str';
import { mainMiddlewaresChain, withAuthMiddlewaresChain } from '@/middlewareChain';
import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';

export const authMiddleware = (request: NextRequest) => {
  const maybeI18nFlag = getMaybeI18nFlagFromRequest(request);
  const i18nPrefix = maybeI18nFlag ? getSlashEnvelope(maybeI18nFlag) : '/';

  return withAuth(mainMiddlewaresChain, {
    pages: { signIn: i18nPrefix + 'sign-up' }
  });
};

export const appProtectedPaths = ['/dashboard'];
export const config = { matcher: ['/((?!api|static|_next|.*\\..*).*)'] };

export default withAuthMiddlewaresChain;
