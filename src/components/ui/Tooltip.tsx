'use client';

import type { ComponentPropsWithoutRef, ElementRef } from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import cn from '@/lib/portable/tailwind/cn';
import { forwardRef } from 'react';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
  // eslint-disable-next-line no-magic-numbers
>(({ sideOffset = 4, className, ...props }, ref) => (
  <TooltipPrimitive.Content
    className={cn(
      'relative z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:hidden data-[state=closed]:animate-out data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    sideOffset={sideOffset}
    ref={ref}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip };
