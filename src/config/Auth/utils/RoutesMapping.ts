import { RoutesDefinition } from '@/types/RoutesMapping';

enum EAuthRoutes {
  LOGIN
}

export type AuthRoutesKeys = keyof typeof EAuthRoutes;
export type AuthRoutes = RoutesDefinition<AuthRoutesKeys>;
