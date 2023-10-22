'use client';

import ButtonProps from '@/config/buttons';
import ROUTES_ROOTS from '@/config/routes';
import { ClassName } from '@/types/React';
import { Button } from '@material-tailwind/react';
import { size, variant } from '@material-tailwind/react/types/components/button';
import { signIn } from 'next-auth/react';
import { FunctionComponent } from 'react';

interface LoginButtonProps extends ButtonProps {}

const DEFAULT_TEXT_CLS = 'text-xl';
const DEFAULT_VARIANT: variant = 'gradient';
const DEFAULT_SIZE: size = 'lg';

const defClassList = (txtCls: string): ClassName => ({
  className: `${txtCls} normal-case flex items-center gap-2`
});

export const LoginButton: FunctionComponent<LoginButtonProps> = ({
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
