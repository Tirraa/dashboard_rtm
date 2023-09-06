import { NextTopLoaderProps } from '@/components/misc/NextTopLoader';

type TProgressbarConfig = {
  PROPS: NextTopLoaderProps;
};

export const ProgressbarConfig: TProgressbarConfig = {
  PROPS: { color: '#1e2529', showSpinner: false, height: 5 }
} as const;
