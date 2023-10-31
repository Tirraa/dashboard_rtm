import BUTTON_CONFIG from '@/components/config/styles/buttons';
import { getLinkTarget } from '@/lib/react';
import { cn } from '@/lib/tailwind';
import { Button as NextUIButton, ButtonProps as NextUIButtonProps } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { FunctionComponent } from 'react';

interface ButtonProps extends NextUIButtonProps {}

export const ButtonHoC: FunctionComponent<ButtonProps> = ({
  children,
  className: classNameValue,
  href: maybeHref,
  onClick: maybeOnClick,
  ...injectedProps
}) => {
  const onClickFun = typeof maybeOnClick === 'function' && !maybeHref ? () => (maybeOnClick as Function)() : undefined;
  const className = cn(classNameValue, BUTTON_CONFIG.CLASSNAME);

  if (maybeHref) {
    const target = getLinkTarget(maybeHref);

    return (
      <NextUIButton {...injectedProps} {...{ className }} href={maybeHref} {...target} as={Link} onClick={onClickFun}>
        {children}
      </NextUIButton>
    );
  }

  return (
    <NextUIButton {...injectedProps} {...{ className }} onClick={onClickFun}>
      {children}
    </NextUIButton>
  );
};

export default ButtonHoC;
