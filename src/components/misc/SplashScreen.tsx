'use client';

import { getRefCurrentPtr } from '@/lib/react';
import Image from 'next/image';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

const TRANSITION_DELAY_MS_VALUE = 250;

interface SplashScreenProps {}

const SplashScreen: FunctionComponent<SplashScreenProps> = () => {
  const splashScreenRef = useRef<HTMLDivElement>(null);
  const splashScreenLogoRef = useRef<HTMLImageElement>(null);
  const [animationDone, setAnimationDone] = useState<boolean>(false);

  useEffect(() => {
    const coroutine = setTimeout(() => {
      const splashScreen = getRefCurrentPtr(splashScreenRef);
      const splashScreenLogo = getRefCurrentPtr(splashScreenLogoRef);

      function killSwitch() {
        setAnimationDone(true);
        if (splashScreen) splashScreen.removeEventListener('transitionend', killSwitch);
      }

      if (splashScreen) {
        splashScreen.style.opacity = '0';
        splashScreen.addEventListener('transitionend', killSwitch);
        if (splashScreenLogo) splashScreenLogo.style.scale = '1';
      }
    }, TRANSITION_DELAY_MS_VALUE);
    return () => clearTimeout(coroutine);
  }, [splashScreenRef]);
  return !animationDone ? (
    <div
      ref={splashScreenRef}
      className="cursor-wait fixed z-50 inset-0 flex items-center justify-center w-full h-screen bg-gray-900 transition-all duration-300"
    >
      <Image
        ref={splashScreenLogoRef}
        src="/assets/rtm-logo.svg"
        height={50}
        width={50}
        alt=""
        style={{ width: '100%', height: 'auto', scale: '.33' }}
        draggable={false}
        className="fixed transition-all duration-200"
      />
    </div>
  ) : (
    <></>
  );
};

export default SplashScreen;
