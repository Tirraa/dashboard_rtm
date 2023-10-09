import { DEFAULT_VARIANT, MaybeThemeVariant, ThemeVariant } from '@/config/themes';
import { getThemeFromLocalStorageStrict, getThemeFromLocalStorageUnstrict, selectTheme } from '@/themes/themeControl';
import { useLayoutEffect, useState } from 'react';

const intializeUseLocalStorageThemeForClientSide = (setCurrentTheme: Function) => setCurrentTheme(getThemeFromLocalStorageUnstrict());

const useLocalStorageTheme = (): MaybeThemeVariant => {
  const [currentTheme, setCurrentTheme] = useState<MaybeThemeVariant>(DEFAULT_VARIANT);

  useLayoutEffect(() => {
    intializeUseLocalStorageThemeForClientSide(setCurrentTheme);
    const handleStorageChange = () => {
      selectTheme(getThemeFromLocalStorageStrict() as ThemeVariant, { dontDispatchEvent: true });
      setCurrentTheme(getThemeFromLocalStorageStrict());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return currentTheme;
};

export default useLocalStorageTheme;
