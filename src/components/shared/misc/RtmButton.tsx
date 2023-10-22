'use client';

import ButtonProps from '@/config/buttons';
import { getLinkTarget } from '@/lib/react';
import { ClassName } from '@/types/React';
import { Button } from '@material-tailwind/react';
import { size, variant } from '@material-tailwind/react/types/components/button';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface InviteBotButtonProps extends ButtonProps {}

const DEFAULT_TEXT_CLS = 'text-xl';
const DEFAULT_VARIANT: variant = 'gradient';
const DEFAULT_SIZE: size = 'lg';

const defClassList = (txtCls: string): ClassName => ({
  className: `${txtCls} normal-case flex items-center gap-2`
});

export const RtmButton: FunctionComponent<InviteBotButtonProps> = ({
  label,
  __IconComponent,
  href,
  title: titleValue,
  className: classNameValue,
  textCls: textClsValue,
  variant: variantValue,
  size: sizeValue,
  ripple: rippleValue
}) => {
  const textCls = textClsValue ?? DEFAULT_TEXT_CLS;
  const className: ClassName = classNameValue ? { className: classNameValue + ' ' + textCls + ' ' + href ? 'mt-4' : '' } : defClassList(textCls);
  const variant = variantValue ?? DEFAULT_VARIANT;
  const size = sizeValue ?? DEFAULT_SIZE;
  const title = titleValue ?? label;
  const ripple = Boolean(rippleValue);

  const btn = (
    <Button {...{ ...className, ripple, title, variant, size }}>
      <span className="flex items-center gap-2">
        {__IconComponent}
        {label}
      </span>
    </Button>
  );

  // {ToDo} fix Material Tailwind? This code is not W3C compliant.
  // * ... https://github.com/creativetimofficial/material-tailwind/issues/448
  if (href) {
    return (
      <Link {...{ href, ...{ ...getLinkTarget(href) } }} className="flex w-fit mt-4">
        {btn}
      </Link>
    );
  }
  return btn;
};

export default RtmButton;
