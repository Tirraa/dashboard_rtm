import { DEFAULT_VARIANT, MaybeThemeVariant } from '@/config/themes';
import { getThemeFromLocalStorageStrict, getThemeFromLocalStorageUnstrict } from '@/themes/themeControl';
import { useLayoutEffect, useState } from 'react';

const intializeUseLocalStorageThemeForClientSide = (setCurrentTheme: Function) => setCurrentTheme(getThemeFromLocalStorageUnstrict());

const useLocalStorageTheme = (): MaybeThemeVariant => {
  const [currentTheme, setCurrentTheme] = useState<MaybeThemeVariant>(DEFAULT_VARIANT);

  useLayoutEffect(() => {
    intializeUseLocalStorageThemeForClientSide(setCurrentTheme);
    const handleStorageChange = () => setCurrentTheme(getThemeFromLocalStorageStrict());

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return currentTheme;
};

export default useLocalStorageTheme;
