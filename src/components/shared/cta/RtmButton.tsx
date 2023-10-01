'use client';

import { getLinkTarget } from '@/lib/react';
import { AppPath } from '@/types/Next';
import { ClassName } from '@/types/React';
import { Button } from '@material-tailwind/react';
import { size, variant } from '@material-tailwind/react/types/components/button';
import Link from 'next/link';
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
  const textCls = textClsValue || DEFAULT_TEXT_CLS;
  const className: ClassName = classNameValue ? { className: classNameValue + ' ' + textCls } : defClassList(textCls);
  const variant = variantValue || DEFAULT_VARIANT;
  const size = sizeValue || DEFAULT_SIZE;
  const title = titleValue || label;
  const ripple = rippleValue !== undefined ? rippleValue : true;

  const btn = (
    <Button {...{ ...className, ripple, title, variant, size }}>
      <span className="flex items-center gap-2">
        <>{__IconComponent}</>
        <>{label}</>
      </span>
    </Button>
  );

  // {ToDo} fix Material Tailwind? This code is not W3C compliant.
  // https://github.com/creativetimofficial/material-tailwind/issues/448
  if (href) return <Link {...{ href, ...{ ...getLinkTarget(href) } }}>{btn}</Link>;
  return btn;
};

export default RtmButton;
