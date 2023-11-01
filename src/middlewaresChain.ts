import { stackMiddlewares } from '@/lib/next';
import withI18n from '@/middlewares/withI18n';
import withProtectedRoutes from '@/middlewares/withProtectedRoutes';
import type { MiddlewareFactory } from './types/Next';

const MAIN_CHAIN: MiddlewareFactory[] = [withI18n];
const WITH_AUTH_CHAIN: MiddlewareFactory[] = [withProtectedRoutes, ...MAIN_CHAIN];

export const mainMiddlewaresChain = stackMiddlewares(MAIN_CHAIN);
export const withAuthMiddlewaresChain = stackMiddlewares(WITH_AUTH_CHAIN);
