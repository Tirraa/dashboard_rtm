import { withAuthMiddlewaresChain } from '@/middlewaresChain';

export const appProtectedPaths = ['/dashboard'];
export const config = { matcher: ['/((?!api|static|_next|.*\\..*).*)'] };

export default withAuthMiddlewaresChain;
