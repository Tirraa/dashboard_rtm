/* v8 ignore start */
// Stryker disable all
import type { MiddlewareFactory } from '@rtm/shared-types/Next';

import withProtectedRoutes from '@/middlewares/withProtectedRoutes';
import { stackMiddlewares } from '@/lib/next';
import withI18n from '@/middlewares/withI18n';

const MAIN_CHAIN: MiddlewareFactory[] = [withI18n];
const WITH_AUTH_CHAIN: MiddlewareFactory[] = [withProtectedRoutes, ...MAIN_CHAIN];

export const mainMiddlewaresChain = stackMiddlewares(MAIN_CHAIN);
export const withAuthMiddlewaresChain = stackMiddlewares(WITH_AUTH_CHAIN);
// Stryker restore all
/* v8 ignore stop */
