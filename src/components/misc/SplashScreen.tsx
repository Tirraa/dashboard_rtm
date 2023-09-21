'use client';

import { I18nProviderClient, getClientSideI18n } from '@/i18n/client';
import { getRefCurrentPtr } from '@/lib/react';
import Image from 'next/image';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

const TRANSITION_DELAY_MS_VALUE = 250;

interface SplashScreenProps {}

const SplashScreenImpl: FunctionComponent<SplashScreenProps> = () => {
  const globalT = getClientSideI18n();
  const splashScreenRef = useRef<HTMLDivElement>(null);
  const splashScreenLogoRef = useRef<HTMLImageElement>(null);
  const [animationDone, setAnimationDone] = useState<boolean>(false);

  useEffect(() => {
    const coroutine = setTimeout(() => {
      const splashScreen = getRefCurrentPtr(splashScreenRef);
      const splashScreenLogo = getRefCurrentPtr(splashScreenLogoRef);

      function killswitch() {
        setAnimationDone(true);
        splashScreen.removeEventListener('transitionend', killswitch);
      }

      if (splashScreen && splashScreenLogo) {
        splashScreen.style.opacity = '0';
        splashScreen.addEventListener('transitionend', killswitch);
        splashScreenLogo.style.scale = '1';
      }
    }, TRANSITION_DELAY_MS_VALUE);
    return () => clearTimeout(coroutine);
  }, [splashScreenRef, splashScreenLogoRef]);
  return !animationDone ? (
    <div
      ref={splashScreenRef}
      className="cursor-wait select-none fixed z-50 inset-0 flex items-center justify-center w-full h-screen bg-gray-900 transition-all duration-300"
    >
      <span className="sr-only">{globalT('vocab.loading')}</span>
      <Image
        ref={splashScreenLogoRef}
        src="/assets/rtm-logo.svg"
        height={50}
        width={50}
        alt=""
        style={{ width: '100%', height: 'auto', scale: '.33' }}
        draggable={false}
        className="fixed select-none transition-all duration-200"
      />
    </div>
  ) : (
    <></>
  );
};

export const SplashScreen: FunctionComponent<SplashScreenProps> = () => (
  <I18nProviderClient>
    <SplashScreenImpl />
  </I18nProviderClient>
);

export default SplashScreen;
