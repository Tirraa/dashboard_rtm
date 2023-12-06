import type { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';
import type { PatchNotesRoutesKeys } from '@/config/SitewideNavbar/PatchNotes/utils/RoutesMapping';
import type { SitewideNavbarRoutesKeys } from '@/config/SitewideNavbar/utils/RoutesMapping';

type RoutesKeysUnion = DashboardRoutesKeys | SitewideNavbarRoutesKeys | PatchNotesRoutesKeys;

export default RoutesKeysUnion;
