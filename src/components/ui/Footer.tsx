'use client';

import type { FunctionComponent } from 'react';

import { useCallback, useEffect, useState, Fragment, useRef } from 'react';
import { getDirection } from 'packages/shared-lib/src/html';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';

const INTERVAL_DURATION = 10_100;

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const [heart, setHeart] = useState<string>('❤️');
  const [nextHeart, setNextHeart] = useState<string>('❤️');
  const [heartToggler, setHeartToggler] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => setIsMounted(true), []);

  const dir = isMounted ? getDirection() : 'ltr';

  const heartsCollectionRef = useRef<string[]>(['❤️', '🧡', '💛', '💚', '💙', '💜', '💕', '💓', '💗', '💖']);
  const heartRef = useRef<string>(heart);
  const nextHeartRef = useRef<string>(nextHeart);
  const heartTogglerRef = useRef<boolean>(heartToggler);

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

  const heartJSX = !isMounted ? (
    <Fragment key="heartJSX">
      <span className="absolute select-none text-center opacity-0 transition-opacity duration-700" aria-hidden="true">
        {heart}
      </span>
      <span className="absolute z-10 text-center opacity-0 transition-opacity duration-700">{nextHeart}</span>
    </Fragment>
  ) : (
    (heartToggler && (
      <Fragment key="heartJSX">
        <span className="absolute select-none text-center opacity-0 transition-opacity duration-700" aria-hidden="true">
          {heart}
        </span>
        <span className="absolute z-10 text-center opacity-100 transition-opacity duration-700">{nextHeart}</span>
      </Fragment>
    )) || (
      <Fragment key="heartJSX">
        <span className="absolute text-center opacity-100 transition-opacity duration-700">{heart}</span>
        <span className="absolute z-10 select-none text-center opacity-0 transition-opacity duration-700" aria-hidden="true">
          {nextHeart}
        </span>
      </Fragment>
    )
  );

  const footerCopyJSX = (
    <span className="ltr:mr-1 rtl:mr-6" key="footerCopyJSX">
      {footerCopy}
    </span>
  );

  const headlineJSX = dir === 'ltr' ? [footerCopyJSX, heartJSX] : [heartJSX, footerCopyJSX];

  return (
    <footer className="z-10 flex min-h-20 flex-col items-center justify-center border-t-[1px] border-transparent bg-black text-center text-white dark:border-card dark:bg-black">
      <p className="relative select-none">{headlineJSX}</p>
    </footer>
  );
};

export default Footer;
