'use client';

import type { WithIsMobile } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';
import type { Session } from 'next-auth';

import NAVBAR_ICON_STYLE from '@/components/config/styles/navbar/NavbarIconStyle';
import { SignalSlashIcon, KeyIcon } from '@heroicons/react/20/solid';
import UserImage from '@/components/ui/hoc/UserImage';
import { useSession, signIn } from 'next-auth/react';
import handleSignOut from '@/lib/misc/handleSignOut';
import { Button } from '@/components/ui/Button';
import { useScopedI18n } from '@/i18n/client';
import { usePathname } from 'next/navigation';
import ROUTES_ROOTS from '##/config/routes';
import { i18ns } from '##/config/i18n';

import NavbarButton from './NavbarButton';

interface NavbarLoginButtonMobileProps {
  session: Session | null;
  currentPathname: string;
}

interface NavbarLoginButtonProps extends WithIsMobile {}

const { SIZE_PX_VALUE: SIZE } = NAVBAR_ICON_STYLE;

const NavbarLoginButtonMobile: FunctionComponent<NavbarLoginButtonMobileProps> = ({ currentPathname, session }) => {
  const scopedT = useScopedI18n(i18ns.auth);
  const className = 'h-full min-w-0 p-0';

  if (session) {
    return (
      <Button onClick={() => handleSignOut(currentPathname)} withTransparentBackground className={className}>
        <UserImage className="absolute rounded-full brightness-75" user={session?.user} height={SIZE} width={SIZE} />
        <SignalSlashIcon className="relative shadow-xl" height={SIZE} width={SIZE} />
        <span className="sr-only">{scopedT('logout')}</span>
      </Button>
    );
  }

  return (
    <Button onClick={() => signIn('discord', { callbackUrl: ROUTES_ROOTS.DASHBOARD })} withTransparentBackground className={className}>
      <KeyIcon height={SIZE} width={SIZE} />
      <span className="sr-only">{scopedT('login')}</span>
    </Button>
  );
};

const NavbarLoginButton: FunctionComponent<NavbarLoginButtonProps> = ({ isMobile }) => {
  const { data: session } = useSession();
  const currentPathname = usePathname();
  const { auth } = i18ns;

  if (isMobile) return <NavbarLoginButtonMobile currentPathname={currentPathname} session={session} />;

  if (session)
    return (
      <NavbarButton
        icon={<UserImage className="rounded-full" user={session?.user} height={SIZE} width={SIZE} />}
        onClick={() => handleSignOut(currentPathname)}
        i18nTitle={`${auth}.logout`}
      />
    );

  return <NavbarButton onClick={() => signIn('discord', { callbackUrl: ROUTES_ROOTS.DASHBOARD })} i18nTitle={`${auth}.login`} />;
};

export default NavbarLoginButton;
