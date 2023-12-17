import type { NavbarElementProps as NavbarElementPropsBase } from '@/types/NavData';
import type { FunctionComponent } from 'react';

import NavbarDropdown from '@/components/layouts/navbar/NavbarDropdown';
import NavbarButton from '@/components/layouts/navbar/NavbarButton';

interface NavbarElementProps extends NavbarElementPropsBase {}

/**
 * @hoc
 * @generator NavbarDropdown?, NavbarButton?
 */
const NavbarElement: FunctionComponent<NavbarElementProps> = ({ embeddedEntities, i18nTitle, path }) =>
  embeddedEntities ? (
    <NavbarDropdown embeddedEntities={embeddedEntities} i18nTitle={i18nTitle} path={path} />
  ) : (
    <NavbarButton i18nTitle={i18nTitle} path={path} />
  );

export default NavbarElement;
