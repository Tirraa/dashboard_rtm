import { NextTopLoaderProps } from '@/components/misc/NextTopLoader';

export const PROGRESSBAR_CONFIG: NextTopLoaderProps = {
  color: 'rgba(255, 255, 255, .15)',
  showSpinner: false,
  height: 5,
  crawlSpeed: 50,
  speed: 275,
  initialPosition: 0.5
} as const;

export default PROGRESSBAR_CONFIG;
