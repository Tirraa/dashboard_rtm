import type { NextTopLoaderProps } from '@/components/layouts/base/NextTopLoader';

const PROGRESSBAR_CONFIG: NextTopLoaderProps = {
  color: 'rgba(255, 255, 255, .15)',
  initialPosition: 0.5,
  showSpinner: false,
  crawlSpeed: 50,
  speed: 275,
  height: 3
} as const;

export default PROGRESSBAR_CONFIG;
