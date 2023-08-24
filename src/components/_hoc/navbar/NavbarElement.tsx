import NavbarButton from '@/components/navbar/NavbarButton';
import NavbarDropdown from '@/components/navbar/NavbarDropdown';
import { EmbeddedEntities, NavDataRouteTitleGetter } from '@/types/NavData';
import { FunctionComponent } from 'react';

interface NavbarElementProps {
  title: NavDataRouteTitleGetter;
  href: string;
  embeddedEntities?: EmbeddedEntities;
}

export const NavbarElement: FunctionComponent<NavbarElementProps> = ({ title, href, embeddedEntities }) =>
  embeddedEntities ? <NavbarDropdown {...{ title, href, embeddedEntities }} /> : <NavbarButton {...{ title, href }} />;

export default NavbarElement;
