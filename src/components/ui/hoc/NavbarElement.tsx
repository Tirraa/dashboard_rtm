import NavbarButton from '@/components/layouts/navbar/NavbarButton';
import NavbarDropdown from '@/components/layouts/navbar/NavbarDropdown';
import type { NavDataEntity } from '@/types/NavData';
import type { i18nParams } from '@/types/Next';
import type { FunctionComponent } from 'react';

interface NavbarElementProps extends NavDataEntity {
  i18nProps: i18nParams;
}

export const NavbarElement: FunctionComponent<NavbarElementProps> = ({ i18nProps, i18nTitle, path, embeddedEntities }) =>
  embeddedEntities ? <NavbarDropdown {...{ i18nProps, i18nTitle, path, embeddedEntities }} /> : <NavbarButton {...{ i18nProps, i18nTitle, path }} />;

export default NavbarElement;
