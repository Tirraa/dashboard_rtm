'use client';

import { RESETTED_BUTTON_PROPS } from '@/components/config/styles/material-tailwind/ButtonsStyles';
import NAVBAR_ICON_STYLE from '@/components/config/styles/navbar/NavbarIconStyle';
import UserImage from '@/components/shared/misc/UserImage';
import { i18ns } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import { useScopedI18n } from '@/i18n/client';
import { KeyIcon, SignalSlashIcon } from '@heroicons/react/20/solid';
import { Button } from '@material-tailwind/react';
import { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FunctionComponent } from 'react';
import NavbarButton from './NavbarButton';

interface NavbarLoginButtonMobileProps {
  session: Session | null;
}

interface NavbarLoginButtonProps {
  isMobile?: boolean;
}

const { MOBILE_SIZE_PX_VALUE } = NAVBAR_ICON_STYLE;

const NavbarLoginButtonMobile: FunctionComponent<NavbarLoginButtonMobileProps> = ({ session }) => {
  const scopedT = useScopedI18n(i18ns.auth);

  if (session) {
    return (
      <Button {...RESETTED_BUTTON_PROPS} onClick={() => signOut()}>
        <UserImage user={session?.user} width={MOBILE_SIZE_PX_VALUE} height={MOBILE_SIZE_PX_VALUE} className="rounded-full absolute brightness-75" />
        <SignalSlashIcon width={MOBILE_SIZE_PX_VALUE} height={MOBILE_SIZE_PX_VALUE} className="relative shadow-xl" />
        <span className="sr-only">{scopedT('logout')}</span>
      </Button>
    );
  }

  return (
    <Button {...RESETTED_BUTTON_PROPS} onClick={() => signIn('discord', { callbackUrl: ROUTES_ROOTS.DASHBOARD })}>
      <KeyIcon width={MOBILE_SIZE_PX_VALUE} height={MOBILE_SIZE_PX_VALUE} />
      <span className="sr-only">{scopedT('login')}</span>
    </Button>
  );
};

export const NavbarLoginButton: FunctionComponent<NavbarLoginButtonProps> = ({ isMobile }) => {
  const { data: session } = useSession();

  if (isMobile) return <NavbarLoginButtonMobile {...{ session }} />;

  if (session)
    return (
      <NavbarButton
        i18nTitle={`${i18ns.auth}.logout`}
        onClick={() => signOut()}
        icon={() => <UserImage user={session?.user} width={MOBILE_SIZE_PX_VALUE} height={MOBILE_SIZE_PX_VALUE} className="rounded-full" />}
      />
    );

  return <NavbarButton i18nTitle={`${i18ns.auth}.login`} onClick={() => signIn('discord', { callbackUrl: ROUTES_ROOTS.DASHBOARD })} />;
};

export default NavbarLoginButton;
