'use client';

import { getLinkTarget } from '@/lib/react';
import { Path } from '@/types/Next';
import { Button } from '@material-tailwind/react';
import { size, variant } from '@material-tailwind/react/types/components/button';
import Link from 'next/link';
import { FunctionComponent, ReactElement } from 'react';

interface InviteBotButtonProps {
  label: string;
  __IconComponent?: ReactElement;
  href?: Path;
  title?: string;
  textCls?: string;
  className?: string;
  variant?: variant;
  size?: size;
  ripple?: boolean;
}

const defTextCls = 'text-xl';
const defClassList = (txtCls: string) => {
  className: `mt-4 ${txtCls} normal-case flex items-center gap-2`;
};
const defVariant: variant = 'gradient';
const defSize: size = 'lg';

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
  const textCls = textClsValue || defTextCls;
  const className = classNameValue ? { className: classNameValue + ' ' + textCls } : defClassList(textCls);
  const variant = variantValue || defVariant;
  const size = sizeValue || defSize;
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
  if (href) return <Link {...{ href, ...{ ...getLinkTarget(href) } }}>{btn}</Link>;
  return btn;
};

export default RtmButton;
