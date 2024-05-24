'use client';

import type { ComponentPropsWithoutRef, ElementRef } from 'react';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { cn } from '@/lib/tailwind';
import { forwardRef } from 'react';

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = forwardRef<
  ElementRef<typeof HoverCardPrimitive.Content>,
  ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
  // eslint-disable-next-line no-magic-numbers
>(({ align = 'center', sideOffset = 4, className, ...props }, ref) => (
  <HoverCardPrimitive.Content
    className={cn(
      'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    sideOffset={sideOffset}
    align={align}
    ref={ref}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCardTrigger, HoverCardContent, HoverCard };
