type TNavbarConfig = {
  NAVBAR_ID: string | null;
  NAVBAR_DESKTOP_BREAKPOINT_PX_VALUE: number;
  LOGO_SIZE_PX_VALUE: number;
  MAX_HEIGHT_PX_VALUE: number;
};

const NavbarConfig: TNavbarConfig = {
  NAVBAR_ID: 'sitewide-navbar',
  NAVBAR_DESKTOP_BREAKPOINT_PX_VALUE: 960,
  LOGO_SIZE_PX_VALUE: 50,
  MAX_HEIGHT_PX_VALUE: 82
} as const;

export default NavbarConfig;
