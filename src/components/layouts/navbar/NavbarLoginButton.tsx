'use client';

import { i18ns } from '##/config/i18n';
import ROUTES_ROOTS from '##/config/routes';
import NAVBAR_ICON_STYLE from '@/components/config/styles/navbar/NavbarIconStyle';
import { Button } from '@/components/ui/Button';
import UserImage from '@/components/ui/hoc/UserImage';
import { useScopedI18n } from '@/i18n/client';
import { getPathnameWithoutI18nFlag } from '@/lib/i18n';
import { KeyIcon, SignalSlashIcon } from '@heroicons/react/20/solid';
import type { WithIsMobile } from '@rtm/shared-types/Next';
import type { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import type { FunctionComponent } from 'react';
import NavbarButton from './NavbarButton';

interface NavbarLoginButtonMobileProps {
  session: Session | null;
  currentPathname: string;
}

interface NavbarLoginButtonProps extends WithIsMobile {}

const { SIZE_PX_VALUE: SIZE } = NAVBAR_ICON_STYLE;

const handleSignOut = (currentUrl: string) => {
  if (getPathnameWithoutI18nFlag(currentUrl).startsWith(ROUTES_ROOTS.DASHBOARD)) {
    signOut({ callbackUrl: ROUTES_ROOTS.WEBSITE });
    return;
  }
  signOut();
};

const NavbarLoginButtonMobile: FunctionComponent<NavbarLoginButtonMobileProps> = ({ session, currentPathname }) => {
  const scopedT = useScopedI18n(i18ns.auth);
  const className = 'h-full min-w-0 p-0';

  if (session) {
    return (
      <Button className={className} onClick={() => handleSignOut(currentPathname)} withTransparentBackground>
        <UserImage user={session?.user} width={SIZE} height={SIZE} className="absolute rounded-full brightness-75" />
        <SignalSlashIcon width={SIZE} height={SIZE} className="relative shadow-xl" />
        <span className="sr-only">{scopedT('logout')}</span>
      </Button>
    );
  }

  return (
    <Button className={className} onClick={() => signIn('discord', { callbackUrl: ROUTES_ROOTS.DASHBOARD })} withTransparentBackground>
      <KeyIcon width={SIZE} height={SIZE} />
      <span className="sr-only">{scopedT('login')}</span>
    </Button>
  );
};

const NavbarLoginButton: FunctionComponent<NavbarLoginButtonProps> = ({ isMobile }) => {
  const { data: session } = useSession();
  const currentPathname = usePathname();
  const { auth } = i18ns;

  if (isMobile) return <NavbarLoginButtonMobile session={session} currentPathname={currentPathname} />;

  if (session)
    return (
      <NavbarButton
        i18nTitle={`${auth}.logout`}
        onClick={() => handleSignOut(currentPathname)}
        icon={<UserImage user={session?.user} width={SIZE} height={SIZE} className="rounded-full" />}
      />
    );

  return <NavbarButton i18nTitle={`${auth}.login`} onClick={() => signIn('discord', { callbackUrl: ROUTES_ROOTS.DASHBOARD })} />;
};

export default NavbarLoginButton;
