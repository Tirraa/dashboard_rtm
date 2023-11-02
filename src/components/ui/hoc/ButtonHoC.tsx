import BUTTON_CONFIG from '@/components/config/styles/buttons';
import type { ButtonProps as UILibButtonProps } from '@/components/ui/Button';
import { Button } from '@/components/ui/Button';
import { getLinkTarget } from '@/lib/react';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';
import type { FunctionComponent, MouseEventHandler } from 'react';

interface ButtonProps extends UILibButtonProps {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  withTransparentBackground?: boolean;
}

export const ButtonHoC: FunctionComponent<ButtonProps> = ({
  children,
  className: classNameValue,
  href: maybeHref,
  onClick: maybeOnClick,
  withTransparentBackground,
  ...injectedProps
}) => {
  const onClickFun = typeof maybeOnClick === 'function' && !maybeHref ? () => (maybeOnClick as Function)() : undefined;
  const className = cn(classNameValue, BUTTON_CONFIG.CLASSNAME, { 'bg-transparent hover:bg-transparent': withTransparentBackground });

  if (maybeHref) {
    const target = getLinkTarget(maybeHref);

    return (
      <Button {...injectedProps} {...{ className }} asChild>
        <Link href={maybeHref} {...target} onClick={onClickFun}>
          {children}
        </Link>
      </Button>
    );
  }

  return (
    <Button {...injectedProps} {...{ className }} onClick={onClickFun}>
      {children}
    </Button>
  );
};

export default ButtonHoC;
