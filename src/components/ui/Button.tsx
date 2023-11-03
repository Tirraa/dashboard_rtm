import { getLinkTarget } from '@/lib/react';
import { cn } from '@/lib/tailwind';
import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import * as React from 'react';
import BUTTON_CONFIG from '../config/styles/buttons';

interface ButtonHoCProps extends ButtonProps {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  withTransparentBackground?: boolean;
}

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
ButtonBase.displayName = 'Button';

/**
 * @hoc
 * @extends {ButtonBase} - AsLink?, LinkTarget?
 */
const Button: React.FunctionComponent<ButtonHoCProps> = ({
  children,
  className: classNameValue,
  href: maybeHref,
  onClick: maybeOnClick,
  withTransparentBackground,
  ...injectedProps
}) => {
  const onClickFun = typeof maybeOnClick === 'function' && !maybeHref ? () => (maybeOnClick as Function)() : undefined;
  const className = cn(classNameValue, BUTTON_CONFIG.CLASSNAME, {
    'bg-transparent hover:bg-transparent': withTransparentBackground
  });

  if (maybeHref) {
    const target = getLinkTarget(maybeHref);

    return (
      <ButtonBase {...injectedProps} {...{ className }} asChild>
        <Link href={maybeHref} {...target} onClick={onClickFun}>
          {children}
        </Link>
      </ButtonBase>
    );
  }

  return (
    <ButtonBase {...injectedProps} {...{ className }} onClick={onClickFun}>
      {children}
    </ButtonBase>
  );
};

export { Button, buttonVariants };
