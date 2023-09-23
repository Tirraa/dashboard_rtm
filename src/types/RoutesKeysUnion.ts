import { AuthRoutesKeys } from '@/config/Auth/utils/RoutesMapping';
import { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';
import { NavbarExtrasRoutesKeys } from '@/config/SitewideNavbar/Extras/utils/RoutesMapping';
import { PatchNotesRoutesKeys } from '@/config/SitewideNavbar/PatchNotes/utils/RoutesMapping';
import { SitewideNavbarRoutesKeys } from '@/config/SitewideNavbar/utils/RoutesMapping';

export type RoutesKeysUnion = DashboardRoutesKeys | SitewideNavbarRoutesKeys | PatchNotesRoutesKeys | AuthRoutesKeys | NavbarExtrasRoutesKeys;

export default RoutesKeysUnion;
