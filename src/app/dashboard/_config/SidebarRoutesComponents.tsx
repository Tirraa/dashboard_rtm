import { RxActivityLog, RxDashboard, RxSketchLogo } from 'react-icons/rx';
import { DashboardRoutesSidebarReactElements } from './utils/RoutesMapping';

const p = { className: 'bg-purple-800 text-white my-4 p-3 rounded-lg inline-block' };
const p2 = { size: 20 };
export const dashboardRoutesSidebarComponents: DashboardRoutesSidebarReactElements = {
  BASE_PAGE: (
    <div {...p}>
      <RxSketchLogo {...p2} />
    </div>
  ),
  FOO_PAGE: (
    <div {...p}>
      <RxDashboard {...p2} />
    </div>
  ),
  BAR_PAGE: (
    <div {...p}>
      <RxActivityLog {...p2} />
    </div>
  )
};

export default dashboardRoutesSidebarComponents;
