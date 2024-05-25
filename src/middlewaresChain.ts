/* v8 ignore start */
// Stryker disable all

import type { MiddlewareFactory } from '@rtm/shared-types/Next';

import withProtectedRoutes from '@/middlewares/withProtectedRoutes';
import stackMiddlewares from '@/lib/portable/next/stackMiddlewares';
import withI18n from '@/middlewares/withI18n';

// {ToDo} Put withI18n at head when Next International's middleware will be properly chainable (Next International V2)
// https://github.com/QuiiBz/next-international/issues/359
const MAIN_CHAIN: MiddlewareFactory[] = [withI18n];
const WITH_AUTH_CHAIN: MiddlewareFactory[] = [withProtectedRoutes, ...MAIN_CHAIN];

export const mainMiddlewaresChain = stackMiddlewares(MAIN_CHAIN);
export const withAuthMiddlewaresChain = stackMiddlewares(WITH_AUTH_CHAIN);

// Stryker restore all
/* v8 ignore stop */
