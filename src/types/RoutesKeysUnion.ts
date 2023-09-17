import { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';
import { PatchNotesRoutesKeys } from '@/config/SitewideNavbar/PatchNotes/utils/RoutesMapping';
import { SitewideNavbarRoutesKeys } from '@/config/SitewideNavbar/utils/RoutesMapping';

export type RoutesKeysUnion = DashboardRoutesKeys | SitewideNavbarRoutesKeys | PatchNotesRoutesKeys;
export default RoutesKeysUnion;
