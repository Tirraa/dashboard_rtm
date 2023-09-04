type TNavbarConfig = {
  NAVBAR_ID: string | null;
  FORCE_NAVBAR_MENU_TO_COLLAPSE_BREAKPOINT_PX_VALUE: number;
  LOGO_SIZE_PX_VALUE: number;
};

const NavbarConfig: TNavbarConfig = {
  NAVBAR_ID: 'sitewide-navbar',
  FORCE_NAVBAR_MENU_TO_COLLAPSE_BREAKPOINT_PX_VALUE: 960,
  LOGO_SIZE_PX_VALUE: 50
} as const;

export default NavbarConfig;
