/* v8 ignore start */
// Stryker disable all

import { APP_PROTECTED_PATHS, VIP_SHORTCUTS } from '##/config/auth';
import { withAuthMiddlewaresChain } from '@/middlewaresChain';

export const config = { matcher: ['/((?!api|static|_next|.*\\..*).*)'] };

export { APP_PROTECTED_PATHS, VIP_SHORTCUTS };
export default withAuthMiddlewaresChain;

// Stryker restore all
/* v8 ignore stop */
