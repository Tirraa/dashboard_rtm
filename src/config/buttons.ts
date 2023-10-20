import { AppPath } from '@/types/Next';
import { size, variant } from '@material-tailwind/react/types/components/button';
import { ReactElement } from 'react';

export interface ButtonProps {
  label: string;
  __IconComponent?: ReactElement;
  href?: AppPath;
  title?: string;
  textCls?: string;
  className?: string;
  variant?: variant;
  size?: size;
  ripple?: boolean;
}

export default ButtonProps;
