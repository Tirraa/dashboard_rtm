'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { AUTHOR_TOOLTIP_SIZE } from '@/config/Blog/etc';
import { useEffect, useState } from 'react';
import MobileDetect from 'mobile-detect';
import Image from 'next/image';

import type { AuthorTooltipProps } from './AuthorTooltip';

export interface AuthorTooltipLazyProps extends AuthorTooltipProps {}

const AuthorTooltipLazy: FunctionComponent<AuthorTooltipLazyProps> = (props) => {
  const [isOnMobileOrTablet, setIsOnMobileOrTablet] = useState<boolean>(true);
  const placeholder = (
    <Image
      src={props.author.profilePictureUrl}
      height={AUTHOR_TOOLTIP_SIZE}
      width={AUTHOR_TOOLTIP_SIZE}
      className="rounded-full"
      draggable={false}
      alt={props.alt}
    />
  );

  useEffect(() => {
    const md = new MobileDetect(window.navigator.userAgent);
    const onMobile = md.mobile() !== null || md.tablet() !== null;

    setIsOnMobileOrTablet(onMobile);
  }, []);

  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<AuthorTooltipProps>>>(null);
  useEffect(() => {
    if (isOnMobileOrTablet || Component !== null) return;
    // eslint-disable-next-line promise/catch-or-return
    import('@/components/ui/blog/AuthorTooltip').then((component) => setComponent(() => component.default));
  });

  if (Component === null) return placeholder;
  return <Component {...props} />;
};

export default AuthorTooltipLazy;
