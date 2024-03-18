'use client';

import type { FunctionComponent } from 'react';

import { getRefCurrentPtr, getLinkTarget } from 'packages/shared-lib/src/react';
import { useCallback, useEffect, useState, useRef } from 'react';
import DISCORD_CONFIG from '@/config/discord';
import { useScopedI18n } from '@/i18n/client';
import { cn } from '@/lib/tailwind';
import Image from 'next/image';
import Link from 'next/link';

export interface LogoProps {
  onPageEnterAnimation?: boolean;
  animatedOnHover?: boolean;
  clickable?: boolean;
}

const ANIMATION_ON_HOVER_CLS = 'animate-[gelatine_285ms_ease-in-out]';
const ON_PAGE_ENTER_CLS = 'animate-[swing_1234ms_ease-out]';

const Logo: FunctionComponent<LogoProps> = ({ onPageEnterAnimation, animatedOnHover, clickable }) => {
  const scopedT = useScopedI18n('vocab');
  const href = DISCORD_CONFIG.BOT_INVITE_LINK;
  const target = getLinkTarget(href);
  const imgRef = useRef<HTMLImageElement>(null);
  const [onLoadAnimation, setOnLoadAnimation] = useState<string>(onPageEnterAnimation ? ON_PAGE_ENTER_CLS : '');

  const onMouseEnterCb = useCallback(() => {
    if (onLoadAnimation) return;

    const imgInstance = getRefCurrentPtr(imgRef);
    if (!imgInstance) return;
    imgInstance.classList.add(ANIMATION_ON_HOVER_CLS);
  }, [onLoadAnimation]);

  useEffect(() => {
    const imgInstance = getRefCurrentPtr(imgRef);
    if (!imgInstance) return;

    function firstAnimationEndHandler() {
      setOnLoadAnimation('');
      imgInstance.removeEventListener('animationend', firstAnimationEndHandler);
    }

    imgInstance.addEventListener('animationend', firstAnimationEndHandler);
    return () => imgInstance.removeEventListener('animationend', firstAnimationEndHandler);
  }, []);

  useEffect(() => {
    if (onLoadAnimation) return;

    const imgInstance = getRefCurrentPtr(imgRef);
    if (!imgInstance) return;

    function animationEndHandler() {
      imgInstance.classList.remove(ANIMATION_ON_HOVER_CLS);
    }

    imgInstance.addEventListener('animationend', animationEndHandler);
    return () => imgInstance.removeEventListener('animationend', animationEndHandler);
  }, [onLoadAnimation]);

  const logo = (
    <Image
      className={cn('m-auto', onLoadAnimation, {
        'hover:animate-[gelatine_285ms_ease-in-out]': !onLoadAnimation && animatedOnHover
      })}
      src="/assets/medias/img/rust-team-management-logo-full-body.svg"
      onMouseEnter={onMouseEnterCb}
      alt={scopedT('logo')}
      ref={imgRef}
      height={69}
      width={226}
      priority
    />
  );

  if (!clickable) return logo;

  return (
    <Link className="m-auto flex h-fit w-fit" target={target} href={href}>
      {logo}
    </Link>
  );
};

export default Logo;
