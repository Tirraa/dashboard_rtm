import * as React from 'react';

import { cn } from '@/lib/tailwind';
import type { TitleType } from '@rtm/shared-types/HTML';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...props} />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement> & { titleType?: TitleType }>(
  ({ className: classNameValue, titleType: titleTypeValue, ...injectedProps }, ref) => {
    const className = cn('text-2xl font-semibold leading-none tracking-tight', classNameValue);
    const titleType = titleTypeValue ?? 'h3';
    const p = { ...injectedProps, ref, className };

    const TITLES_MAP: Record<TitleType, React.ReactNode> = {
      h1: <h1 {...p} />,
      h2: <h2 {...p} />,
      h3: <h3 {...p} />,
      h4: <h4 {...p} />,
      h5: <h5 {...p} />,
      h6: <h6 {...p} />
    } as const;

    return TITLES_MAP[titleType];
  }
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
