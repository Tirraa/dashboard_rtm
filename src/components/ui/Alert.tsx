/* v8 ignore start */
// Stryker disable all

import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cva } from 'class-variance-authority';
import cn from '@/lib/portable/tailwind/cn';
import { forwardRef } from 'react';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        default: 'bg-background text-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

const Alert = forwardRef<HTMLDivElement, VariantProps<typeof alertVariants> & HTMLAttributes<HTMLDivElement>>(
  ({ className, variant, ...props }, ref) => <div className={cn(alertVariants({ variant }), className)} role="alert" ref={ref} {...props} />
);
Alert.displayName = 'Alert';

const AlertTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h5 className={cn('mb-1 font-medium leading-none tracking-tight', className)} ref={ref} {...props} />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <div className={cn('text-sm [&_p]:leading-relaxed', className)} ref={ref} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { AlertDescription, AlertTitle, Alert };

// Stryker restore all
/* v8 ignore stop */
