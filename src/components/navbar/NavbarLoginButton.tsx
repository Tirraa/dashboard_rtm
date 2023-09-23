'use client';

import RoutesBase from '@/config/routes';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FunctionComponent } from 'react';
import NavbarButton from './NavbarButton';

interface NavbarLoginButtonProps {}

const NavbarLoginButton: FunctionComponent<NavbarLoginButtonProps> = () => {
  const { data: session } = useSession();

  if (session) return <NavbarButton i18nTitle={'auth.logout'} onClick={() => signOut()} />;
  return <NavbarButton i18nTitle={'auth.login'} onClick={() => signIn('discord', { callbackUrl: RoutesBase.DASHBOARD })} />;
};

export default NavbarLoginButton;
