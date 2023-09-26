type TDashboardSidebarDynamicRenderingConfig = {
  DASHBOARD_LAYOUT_MAIN_WRAPPER_ID: string;
  ICON_CLASS: string;
  ICON_SEPARATOR_CLASS: string;
  ICON_SEPARATOR_WIDTH_FACTOR: number;
  ICON_MARGIN_X_FACTOR: number;
  SIDEBAR_ICON_SIZE_PX_VALUE: number;
};

export const DashboardSidebarDynamicRenderingConfig: TDashboardSidebarDynamicRenderingConfig = {
  DASHBOARD_LAYOUT_MAIN_WRAPPER_ID: 'main-box-id',
  ICON_CLASS: 'sidebar-icon',
  ICON_SEPARATOR_CLASS: 'sidebar-icon-separator',
  ICON_SEPARATOR_WIDTH_FACTOR: 0.8,
  ICON_MARGIN_X_FACTOR: 1.7,
  SIDEBAR_ICON_SIZE_PX_VALUE: 20
} as const;

export default DashboardSidebarDynamicRenderingConfig;
