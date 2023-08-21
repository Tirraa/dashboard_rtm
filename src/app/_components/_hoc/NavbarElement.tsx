import { FunctionComponent } from 'react';
import { EmbeddedEntities, NavDataRouteTitleGetter } from '../../_types/NavData';
import NavbarButton from '../NavbarButton';
import NavbarDropdown from '../NavbarDropdown';

interface NavbarElementProps {
  title: NavDataRouteTitleGetter;
  href: string;
  embeddedEntities?: EmbeddedEntities;
}

const NavbarElement: FunctionComponent<NavbarElementProps> = ({ title, href, embeddedEntities }) =>
  embeddedEntities ? <NavbarDropdown {...{ title, href, embeddedEntities }} /> : <NavbarButton {...{ title, href }} />;

export default NavbarElement;
