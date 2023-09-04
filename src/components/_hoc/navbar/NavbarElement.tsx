import NavbarButton from '@/components/navbar/NavbarButton';
import NavbarDropdown from '@/components/navbar/NavbarDropdown';
import { NavDataEntity } from '@/types/NavData';
import { i18nParams } from '@/types/Next';
import { FunctionComponent } from 'react';

interface NavbarElementProps extends NavDataEntity {
  i18nProps: i18nParams;
}

export const NavbarElement: FunctionComponent<NavbarElementProps> = ({ i18nProps, i18nTitle, path, embeddedEntities }) =>
  embeddedEntities ? <NavbarDropdown {...{ i18nProps, i18nTitle, path, embeddedEntities }} /> : <NavbarButton {...{ i18nProps, i18nTitle, path }} />;

export default NavbarElement;
