import NavbarButton from '@/components/layouts/navbar/NavbarButton';
import NavbarDropdown from '@/components/layouts/navbar/NavbarDropdown';
import type { NavbarElementProps as NavbarElementPropsBase } from '@/types/NavData';
import type { FunctionComponent } from 'react';

interface NavbarElementProps extends NavbarElementPropsBase {}

/**
 * @hoc
 */
export const NavbarElement: FunctionComponent<NavbarElementProps> = ({ i18nProps, i18nTitle, path, embeddedEntities }) =>
  embeddedEntities ? <NavbarDropdown {...{ i18nProps, i18nTitle, path, embeddedEntities }} /> : <NavbarButton {...{ i18nProps, i18nTitle, path }} />;

export default NavbarElement;
