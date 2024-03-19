'use client';

import type { FunctionComponent } from 'react';

import { useCallback, useEffect, useState, useRef } from 'react';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';

const INTERVAL_DURATION = 10_100;

interface FooterProps {}

const FooterHeadline: FunctionComponent = () => {
  const [heart, setHeart] = useState<string>('❤️');
  const [nextHeart, setNextHeart] = useState<string>('❤️');
  const [heartToggler, setHeartToggler] = useState<boolean>(true);

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

  return (
    <p className="relative flex select-none">
      <span>{footerCopy}</span>
      {(heartToggler && (
        <span className="relative">
          <span className="absolute select-none opacity-0 transition-opacity duration-700" aria-hidden="true">
            &nbsp;{heart}
          </span>
          <span className="absolute z-10 opacity-100 transition-opacity duration-700">&nbsp;{nextHeart}</span>
        </span>
      )) || (
        <span className="relative">
          <span className="absolute opacity-100 transition-opacity duration-700">&nbsp;{heart}</span>
          <span className="absolute z-10 select-none opacity-0 transition-opacity duration-700" aria-hidden="true">
            &nbsp;{nextHeart}
          </span>
        </span>
      )}
    </p>
  );
};

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer className="z-10 flex min-h-20 flex-col items-center justify-center border-t-[1px] border-transparent bg-black text-center text-white dark:border-card dark:bg-black">
      <FooterHeadline />
    </footer>
  );
};

export default Footer;
