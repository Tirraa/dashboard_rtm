/* v8 ignore start */
// Stryker disable all

import type { MiddlewareFactory } from '@rtm/shared-types/Next';

import withAuth from '@/middlewares/withAuth';
import { stackMiddlewares } from '@/lib/next';
import withI18n from '@/middlewares/withI18n';

const CHAIN: MiddlewareFactory[] = [withAuth, withI18n];

export const withAuthMiddlewaresChain = stackMiddlewares(CHAIN);

// Stryker restore all
/* v8 ignore stop */
