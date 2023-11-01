import type { DashboardRoutesIcons } from '@/config/DashboardSidebar/utils/IconsMapping';
import { RxActivityLog, RxDashboard, RxSketchLogo } from 'react-icons/rx';

export const SIDEBAR_ROUTES_ICONS: DashboardRoutesIcons = {
  MAIN_PAGE: RxSketchLogo,
  FOO_PAGE: RxDashboard,
  BAR_PAGE: RxActivityLog
};

export default SIDEBAR_ROUTES_ICONS;
