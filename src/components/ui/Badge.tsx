/* v8 ignore start */
// Stryker disable all

import type { HTMLAttributes as ReactHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';
import { cn } from '@/lib/tailwind';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        outline: 'text-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps extends ReactHTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants, Badge };

// Stryker restore all
/* v8 ignore stop */
