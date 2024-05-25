'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { PxValue } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import { useCallback, useEffect, useState, useRef } from 'react';
import { FOOTER_CONTAINER_ID } from '@/config/elementsId';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

const INTERVAL_DURATION = 10_100;

interface FooterProps {}

const FooterHeadline: FunctionComponent = () => {
  const [heart, setHeart] = useState<string>('❤️');
  const [nextHeart, setNextHeart] = useState<string>('❤️');
  const [heartToggler, setHeartToggler] = useState<boolean>(true);
  // eslint-disable-next-line no-magic-numbers
  const [heartContainerWidthInPx, setHeartContainerWidthInPx] = useState<PxValue>(0);

  const heartsCollectionRef = useRef<string[]>(['❤️', '🧡', '💛', '💚', '💙', '💜', '💕', '💓', '💗', '💖']);
  const heartRef = useRef<string>(heart);
  const nextHeartRef = useRef<string>(nextHeart);
  const heartTogglerRef = useRef<boolean>(heartToggler);

  const firstHeartRef = useRef<MaybeNull<HTMLSpanElement>>(null);
  const secondHeartRef = useRef<MaybeNull<HTMLSpanElement>>(null);

  const scopedT = useScopedI18n(i18ns.vocab);
  const footerCopy = scopedT('footer-copy').replace('❤️', '');

  const pickRandomHeart = useCallback(() => {
    const hearts = getRefCurrentPtr(heartsCollectionRef);
    if (!hearts) return '❤️';
    return hearts[Math.floor(Math.random() * hearts.length)];
  }, []);

  useEffect(() => {
    function heartsEffectHandler() {
      let newHeart = pickRandomHeart();

      const heartToggler = getRefCurrentPtr(heartTogglerRef);
      const [heart, nextHeart] = [getRefCurrentPtr(heartRef), getRefCurrentPtr(nextHeartRef)];

      const oldHeart = heartToggler ? nextHeart : heart;

      while (newHeart === oldHeart) newHeart = pickRandomHeart();

      if (heartToggler) setHeart(newHeart);
      else setNextHeart(newHeart);

      setHeartToggler(!heartToggler);
    }

    const interval = setInterval(() => {
      heartsEffectHandler();
    }, INTERVAL_DURATION);

    return () => clearInterval(interval);
  }, [pickRandomHeart]);

  useEffect(() => {
    heartTogglerRef.current = heartToggler;
    heartRef.current = heart;
    nextHeartRef.current = nextHeart;
  }, [heartToggler, heart, nextHeart]);

  useEffect(() => {
    const firstHeartInstance = getRefCurrentPtr(firstHeartRef);
    const secondHeartInstance = getRefCurrentPtr(secondHeartRef);

    if (firstHeartInstance === null || secondHeartInstance === null) return;

    if (heartToggler) setHeartContainerWidthInPx(secondHeartInstance.getBoundingClientRect().width);
    else setHeartContainerWidthInPx(firstHeartInstance.getBoundingClientRect().width);
  }, [heartToggler]);

  return (
    <p className="relative flex select-none">
      <span
        className={cn('opacity-100 transition-opacity delay-75 duration-500', {
          // eslint-disable-next-line no-magic-numbers
          'opacity-0': heartContainerWidthInPx === 0
        })}
      >
        {footerCopy}
      </span>
      <span
        className={cn('relative opacity-100 transition-opacity delay-200 duration-500', {
          // eslint-disable-next-line no-magic-numbers
          'opacity-0': heartContainerWidthInPx === 0
        })}
        style={{ width: heartContainerWidthInPx + 'px' }}
      >
        <span
          className={cn('absolute bottom-0 left-0 right-0 top-0 w-fit opacity-100 transition-opacity duration-700', {
            'opacity-0': heartToggler
          })}
          aria-hidden={heartToggler}
          ref={firstHeartRef}
        >
          &nbsp;{heart}
        </span>
        <span
          className={cn('absolute bottom-0 left-0 right-0 top-0 z-10 w-fit opacity-100 transition-opacity duration-700', {
            'opacity-0': !heartToggler
          })}
          aria-hidden={!heartToggler}
          ref={secondHeartRef}
        >
          &nbsp;{nextHeart}
        </span>
      </span>
    </p>
  );
};

const Footer: FunctionComponent<FooterProps> = () => (
  <footer
    className="z-10 flex min-h-20 flex-col items-center justify-center border-t-[1px] border-transparent bg-black text-center text-white dark:border-card dark:bg-black"
    data-pagefind-ignore="all"
    id={FOOTER_CONTAINER_ID}
  >
    <FooterHeadline />
  </footer>
);

export default Footer;
