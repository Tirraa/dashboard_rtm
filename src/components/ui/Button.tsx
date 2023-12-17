import type { VariantProps } from 'class-variance-authority';

import { getLinkTarget } from '@rtm/shared-lib/react';
import { cva } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/tailwind';
import * as React from 'react';
import Link from 'next/link';

import BUTTON_CONFIG from '../config/styles/buttons';

interface ButtonHoCProps extends ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  withTransparentBackground?: boolean;
  href?: string;
}

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        link: 'text-primary underline-offset-4 hover:underline',
        ghost: 'hover:bg-accent hover:text-accent-foreground'
      },
      size: {
        lg: 'h-11 rounded-md px-8',
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonProps>(({ asChild = false, className, variant, size, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ className, variant, size }))} ref={ref} {...props} />;
});
ButtonBase.displayName = 'Button';

/**
 * @hoc
 * @extends {ButtonBase} - AsLink?, LinkTarget?
 */
const Button: React.FunctionComponent<ButtonHoCProps> = ({
  className: classNameValue,
  withTransparentBackground,
  onClick: maybeOnClick,
  href: maybeHref,
  children,
  ...injectedProps
}) => {
  const onClickFun = typeof maybeOnClick === 'function' && !maybeHref ? () => (maybeOnClick as Function)() : undefined;
  const className = cn(classNameValue, BUTTON_CONFIG.CLASSNAME, {
    'bg-transparent hover:bg-transparent': withTransparentBackground
  });

  if (maybeHref) {
    const target = getLinkTarget(maybeHref);

    return (
      <ButtonBase {...injectedProps} className={className} asChild>
        <Link onClick={onClickFun} href={maybeHref} target={target}>
          {children}
        </Link>
      </ButtonBase>
    );
  }

  return (
    <ButtonBase {...injectedProps} className={className} onClick={onClickFun}>
      {children}
    </ButtonBase>
  );
};

export { buttonVariants, Button };
