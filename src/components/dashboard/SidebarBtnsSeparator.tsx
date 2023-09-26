import DashboardSidebarDynamicRenderingConfig from '@/config/DashboardSidebar/dynamicRenderingConfig';
import { CSSProperties, FunctionComponent } from 'react';

interface SidebarBtnSeparatorProps {
  style?: CSSProperties;
}

const DEFAULT_STYLE_VALUE = {};

const STYLING_CLASSLIST = 'm-auto my-2';

const { ICON_SEPARATOR_CLASS } = DashboardSidebarDynamicRenderingConfig;
export const SidebarBtnSeparator: FunctionComponent<SidebarBtnSeparatorProps> = ({ style: styleValue }) => (
  <hr className={STYLING_CLASSLIST + ' ' + ICON_SEPARATOR_CLASS} {...{ style: styleValue || DEFAULT_STYLE_VALUE }} />
);

export default SidebarBtnSeparator;
