/* v8 ignore start */
// Stryker disable all

'use client';

import type { ComponentPropsWithoutRef, ElementRef } from 'react';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/lib/tailwind';
import { forwardRef } from 'react';

const Separator = forwardRef<ElementRef<typeof SeparatorPrimitive.Root>, ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>>(
  ({ orientation = 'horizontal', decorative = true, className, ...props }, ref) => (
    <SeparatorPrimitive.Root
      className={cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', className)}
      orientation={orientation}
      decorative={decorative}
      ref={ref}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

// Stryker restore all
/* v8 ignore stop */
