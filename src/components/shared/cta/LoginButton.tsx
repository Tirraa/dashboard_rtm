'use client';

import ROUTES_ROOTS from '@/config/routes';
import { AppPath } from '@/types/Next';
import { ClassName } from '@/types/React';
import { Button } from '@material-tailwind/react';
import { size, variant } from '@material-tailwind/react/types/components/button';
import { signIn } from 'next-auth/react';
import { FunctionComponent, ReactElement } from 'react';

interface InviteBotButtonProps {
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

const DEFAULT_TEXT_CLS = 'text-xl';
const DEFAULT_VARIANT: variant = 'gradient';
const DEFAULT_SIZE: size = 'lg';

const defClassList = (txtCls: string): ClassName => ({
  className: `mt-4 ${txtCls} normal-case flex items-center gap-2`
});

export const LoginButton: FunctionComponent<InviteBotButtonProps> = ({
  label,
  title: titleValue,
  className: classNameValue,
  textCls: textClsValue,
  variant: variantValue,
  size: sizeValue,
  ripple: rippleValue
}) => {
  const textCls = textClsValue ?? DEFAULT_TEXT_CLS;
  const className: ClassName = classNameValue ? { className: classNameValue + ' ' + textCls } : defClassList(textCls);
  const variant = variantValue ?? DEFAULT_VARIANT;
  const size = sizeValue ?? DEFAULT_SIZE;
  const title = titleValue ?? label;
  const ripple = Boolean(rippleValue);

  const btn = (
    <Button {...{ ...className, ripple, title, variant, size }} onClick={() => signIn('discord', { callbackUrl: ROUTES_ROOTS.DASHBOARD })}>
      <span className="flex items-center gap-2">{label}</span>
    </Button>
  );

  return btn;
};

export default LoginButton;
