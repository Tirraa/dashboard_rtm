import type { AuthRoutesKeys } from '@/config/Auth/utils/RoutesMapping';
import type { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';
import type { PatchNotesRoutesKeys } from '@/config/SitewideNavbar/PatchNotes/utils/RoutesMapping';
import type { SitewideNavbarRoutesKeys } from '@/config/SitewideNavbar/utils/RoutesMapping';

export type RoutesKeysUnion = DashboardRoutesKeys | SitewideNavbarRoutesKeys | PatchNotesRoutesKeys | AuthRoutesKeys;

export default RoutesKeysUnion;
