import { NextTopLoaderProps } from '@/components/misc/NextTopLoader';

type TProgressbarConfig = {
  PROPS: NextTopLoaderProps;
};

export const ProgressbarConfig: TProgressbarConfig = {
  PROPS: {
    color: 'rgba(255, 255, 255, .15)',
    showSpinner: false,
    height: 5,
    crawlSpeed: 50,
    speed: 275,
    initialPosition: 0.5
  }
} as const;
