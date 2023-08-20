import { FunctionComponent } from 'react';
import { embeddedEntities, NavDataRouteTitleGetter } from '../../_types/NavData';
import NavbarButton from '../NavbarButton';

interface NavbarElementProps {
  href: string;
  title: NavDataRouteTitleGetter;
  embeddedEntities?: embeddedEntities;
}

const NavbarElement: FunctionComponent<NavbarElementProps> = ({ href, title, embeddedEntities }) => {
  if (!embeddedEntities) {
    return <NavbarButton {...{ href, title }} />;
  }
  // * ... {ToDo} Dropdown!
  return <NavbarButton {...{ href, title }} />;
};

export default NavbarElement;
