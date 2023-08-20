import { FunctionComponent } from 'react';
import { EmbeddedEntities, NavDataRouteTitleGetter } from '../../_types/NavData';
import NavbarButton from '../NavbarButton';
import NavbarDropdown from '../NavbarDropdown';

interface NavbarElementProps {
  href: string;
  title: NavDataRouteTitleGetter;
  embeddedEntities?: EmbeddedEntities;
}

const NavbarElement: FunctionComponent<NavbarElementProps> = ({ href, title, embeddedEntities }) => {
  if (!embeddedEntities) {
    return <NavbarButton {...{ href, title }} />;
  }
  return <NavbarDropdown {...{ href, title, embeddedEntities }} />;
};

export default NavbarElement;
