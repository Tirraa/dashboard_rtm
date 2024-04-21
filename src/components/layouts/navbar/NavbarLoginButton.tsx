'use client';

import type { WithIsMobile, WithSession } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import NAVBAR_ICON_STYLE from '@/components/config/styles/navbar/NavbarIconStyle';
import { SignalSlashIcon, KeyIcon } from '@heroicons/react/16/solid';
import UserImage from '@/components/ui/hoc/UserImage';
import { useSession, signOut } from 'next-auth/react';
import { signInAction } from '@/lib/authServer';
import { Button } from '@/components/ui/Button';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';

import NavbarButton from './NavbarButton';

interface NavbarLoginButtonMobileProps extends WithSession {}

interface NavbarLoginButtonProps extends WithIsMobile {}

const { SIZE_PX_VALUE: SIZE } = NAVBAR_ICON_STYLE;

const NavbarLoginButtonMobile: FunctionComponent<NavbarLoginButtonMobileProps> = ({ session }) => {
  const scopedT = useScopedI18n(i18ns.auth);
  const className = 'h-full min-w-0 p-0';

  if (session) {
    return (
      <Button
        onClick={() => {
          signOut();
        }}
        withTransparentBackground
        className={className}
      >
        <UserImage className="absolute rounded-full brightness-75" user={session?.user} height={SIZE} width={SIZE} />
        <SignalSlashIcon className="relative shadow-xl" height={SIZE} width={SIZE} />
        <span className="sr-only">{scopedT('logout')}</span>
      </Button>
    );
  }

  return (
    <form action={signInAction} className="contents">
      <Button withTransparentBackground className={className} type="submit">
        <KeyIcon height={SIZE} width={SIZE} />
        <span className="sr-only">{scopedT('login')}</span>
      </Button>
    </form>
  );
};

const NavbarLoginButton: FunctionComponent<NavbarLoginButtonProps> = ({ isMobile }) => {
  const { data: session } = useSession();
  const { auth } = i18ns;

  if (isMobile) return <NavbarLoginButtonMobile session={session} />;

  if (session) {
    return (
      <NavbarButton
        icon={<UserImage className="rounded-full" user={session?.user} height={SIZE} width={SIZE} />}
        onClick={() => {
          signOut();
        }}
        i18nTitle={`${auth}.logout`}
        className="flex gap-2"
        type="submit"
      />
    );
  }

  return (
    <form action={signInAction} className="contents">
      <NavbarButton i18nTitle={`${auth}.login`} type="submit" />
    </form>
  );
};

export default NavbarLoginButton;
