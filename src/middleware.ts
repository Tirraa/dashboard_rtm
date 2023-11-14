import { APP_PROTECTED_PATHS } from '##/config/auth';
import { withAuthMiddlewaresChain } from '@/middlewaresChain';

export const config = { matcher: ['/((?!api|static|_next|.*\\..*).*)'] };

export { APP_PROTECTED_PATHS };
export default withAuthMiddlewaresChain;
