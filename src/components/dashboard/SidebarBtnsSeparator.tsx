import DashboardSidebarDynamicRenderingConfig from '@/config/DashboardSidebar/dynamicRenderingConfig';
import { CSSProperties, FunctionComponent } from 'react';

interface SidebarBtnSeparatorProps {
  style?: CSSProperties;
}

const defaultStyleValue = {};

const sidebarIconSeparatorClass: string = DashboardSidebarDynamicRenderingConfig.iconSeparatorClass;
const SidebarBtnSeparator: FunctionComponent<SidebarBtnSeparatorProps> = ({ style: styleValue }) => {
  const style = styleValue || defaultStyleValue;
  return <hr className={'relative top-2 m-auto' + ' ' + sidebarIconSeparatorClass} {...{ style }} />;
};

export default SidebarBtnSeparator;
