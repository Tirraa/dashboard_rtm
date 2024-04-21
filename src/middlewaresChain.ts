/* v8 ignore start */
// Stryker disable all

import type { MiddlewareFactory } from '@rtm/shared-types/Next';

import { stackMiddlewares } from '@/lib/next';
import withI18n from '@/middlewares/withI18n';

import withAuth from './middlewares/withAuth';

const middlewares: MiddlewareFactory[] = [withI18n, withAuth];

export const withAuthMiddlewaresChain = stackMiddlewares(middlewares);

// Stryker restore all
/* v8 ignore stop */
