import NavbarButton from '@/components/navbar/NavbarButton';
import NavbarDropdown from '@/components/navbar/NavbarDropdown';
import { NavDataEntity } from '@/types/NavData';
import { i18nParams } from '@/types/Next';
import { FunctionComponent } from 'react';

interface NavbarElementProps extends NavDataEntity {
  i18nProps: i18nParams;
}

export const NavbarElement: FunctionComponent<NavbarElementProps> = ({ i18nProps, i18nTitleInfos, path, embeddedEntities }) => {
  return embeddedEntities ? (
    <NavbarDropdown {...{ i18nProps, i18nTitleInfos, path, embeddedEntities }} />
  ) : (
    <NavbarButton {...{ i18nProps, i18nTitleInfos, path }} />
  );
};

export default NavbarElement;
