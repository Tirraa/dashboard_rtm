/* v8 ignore start */
// Stryker disable all
import { withAuthMiddlewaresChain } from '@/middlewaresChain';
import { APP_PROTECTED_PATHS } from '##/config/auth';

export const config = { matcher: ['/((?!api|static|_next|.*\\..*).*)'] };

export { APP_PROTECTED_PATHS };
export default withAuthMiddlewaresChain;
/* v8 ignore stop */
// Stryker restore all
