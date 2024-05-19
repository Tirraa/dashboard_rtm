'use client';

import type { PxValue } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import { getRefCurrentPtr, getLinkTarget } from '@rtm/shared-lib/react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { getClientSideI18n } from '@/i18n/client';
import DISCORD_CONFIG from '@/config/discord';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';
import Image from 'next/image';
import Link from 'next/link';

import logoPic from '/public/assets/medias/img/vectors/logo/rtm-full-body.svg';

interface LogoProps {
  onPageEnterAnimation?: boolean;
  animatedOnHover?: boolean;
  clickable?: boolean;
  height?: PxValue;
  width?: PxValue;
}

const ON_PAGE_ENTER_CLS = 'animate-[swing_1234ms_ease-out]';

const Logo: FunctionComponent<LogoProps> = ({ onPageEnterAnimation, animatedOnHover, clickable, height, width }) => {
  const href = DISCORD_CONFIG.BOT_INVITE_LINK;
  const target = getLinkTarget(href);
  const imgRef = useRef<HTMLImageElement>(null);
  const [onLoadAnimation, setOnLoadAnimation] = useState<string>(onPageEnterAnimation ? ON_PAGE_ENTER_CLS : '');
  const globalT = getClientSideI18n();

  const onMouseEnterCb = useCallback(() => {
    if (onLoadAnimation || !animatedOnHover) return;

    const imgInstance = getRefCurrentPtr(imgRef);
    if (!imgInstance) return;

    imgInstance.style.animationName = 'gelatine';
    imgInstance.style.animationDuration = '285ms';
    imgInstance.style.animationTimingFunction = 'ease-in-out';

    const oldAnimationName = imgInstance.style.animationName;
    imgInstance.style.animationName = 'none';
    window.requestAnimationFrame(() => {
      imgInstance.style.animationName = oldAnimationName;
    });
  }, [onLoadAnimation, animatedOnHover]);

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
      imgInstance.style.animationName = 'none';
      imgInstance.style.animationDuration = '0s';
      imgInstance.style.animationTimingFunction = 'unset';
    }

    imgInstance.addEventListener('animationend', animationEndHandler);
    return () => imgInstance.removeEventListener('animationend', animationEndHandler);
  }, [onLoadAnimation]);

  const logo = (
    <Image
      className={cn('select-none', onLoadAnimation)}
      alt={globalT(`${i18ns.srOnly}.brand-logo`)}
      onMouseEnter={onMouseEnterCb}
      draggable={false}
      height={height}
      src={logoPic}
      width={width}
      ref={imgRef}
      priority
    />
  );

  if (!clickable) return logo;

  return (
    <Link className="m-auto flex h-fit w-fit select-none" target={target} href={href}>
      {logo}
    </Link>
  );
};

export default Logo;
