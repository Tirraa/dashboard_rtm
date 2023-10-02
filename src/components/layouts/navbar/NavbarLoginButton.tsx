'use client';

import { i18ns } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FunctionComponent } from 'react';
import NavbarButton from './NavbarButton';

interface NavbarLoginButtonProps {}

export const NavbarLoginButton: FunctionComponent<NavbarLoginButtonProps> = () => {
  const { data: session } = useSession();

  if (session) return <NavbarButton i18nTitle={`${i18ns.auth}.logout`} onClick={() => signOut()} />;
  return <NavbarButton i18nTitle={`${i18ns.auth}.login`} onClick={() => signIn('discord', { callbackUrl: ROUTES_ROOTS.DASHBOARD })} />;
};

export default NavbarLoginButton;