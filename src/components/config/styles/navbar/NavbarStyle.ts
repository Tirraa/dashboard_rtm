/* v8 ignore start */
// Stryker disable all

type NavbarStyleType = {
  LOGO_HEIGHT: number;
  LOGO_WIDTH: number;
};

const NAVBAR_STYLE: NavbarStyleType = {
  LOGO_HEIGHT: 70,
  LOGO_WIDTH: 99
} as const;

export default NAVBAR_STYLE;

// Stryker restore all
/* v8 ignore stop */
