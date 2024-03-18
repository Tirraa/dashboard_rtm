'use client';

import type { FunctionComponent } from 'react';

import { getRefCurrentPtr, getLinkTarget } from 'packages/shared-lib/src/react';
import DISCORD_CONFIG from '@/config/discord';
import { useScopedI18n } from '@/i18n/client';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/tailwind';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  animatedOnHover?: boolean;
  clickable?: boolean;
}

const ANIMATION_CLS = 'animate-[gelatine_285ms_ease-in-out]';

const Logo: FunctionComponent<LogoProps> = ({ animatedOnHover, clickable }) => {
  const scopedT = useScopedI18n('vocab');
  const href = DISCORD_CONFIG.BOT_INVITE_LINK;
  const target = getLinkTarget(href);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imgInstance = getRefCurrentPtr(imgRef);
    if (!imgInstance) return;

    function animationEndHandler() {
      imgInstance.classList.remove(ANIMATION_CLS);
    }

    imgInstance.addEventListener('animationend', animationEndHandler);
    return () => imgInstance.removeEventListener('animationend', animationEndHandler);
  }, []);

  const img = (
    <Image
      className={cn('m-auto', {
        'hover:animate-[gelatine_285ms_ease-in-out]': animatedOnHover
      })}
      onMouseEnter={() => {
        imgRef.current?.classList.add(ANIMATION_CLS);
      }}
      src="/assets/rust-team-management-logo-full-body.svg"
      alt={scopedT('logo')}
      ref={imgRef}
      height={69}
      width={226}
      priority
    />
  );

  if (!clickable) return img;

  return (
    <Link className="m-auto flex h-fit w-fit" target={target} href={href}>
      {img}
    </Link>
  );
};

export default Logo;
