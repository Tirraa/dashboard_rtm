/* v8 ignore start */
import type { PatchNotesRoutesKeys } from '@/config/SitewideNavbar/PatchNotes/utils/RoutesMapping';
import type { SitewideNavbarRoutesKeys } from '@/config/SitewideNavbar/utils/RoutesMapping';
import type { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';

type RoutesKeysUnion = SitewideNavbarRoutesKeys | PatchNotesRoutesKeys | DashboardRoutesKeys;

export default RoutesKeysUnion;
/* v8 ignore stop */
