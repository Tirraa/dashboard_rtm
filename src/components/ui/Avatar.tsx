/* v8 ignore start */
// Stryker disable all

'use client';

import type { ComponentPropsWithoutRef, ElementRef } from 'react';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/tailwind';
import { forwardRef } from 'react';

const Avatar = forwardRef<ElementRef<typeof AvatarPrimitive.Root>, ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Root className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)} ref={ref} {...props} />
  )
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = forwardRef<ElementRef<typeof AvatarPrimitive.Image>, ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>>(
  ({ className, ...props }, ref) => <AvatarPrimitive.Image className={cn('aspect-square h-full w-full', className)} ref={ref} {...props} />
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = forwardRef<ElementRef<typeof AvatarPrimitive.Fallback>, ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
      className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
      ref={ref}
      {...props}
    />
  )
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { AvatarFallback, AvatarImage, Avatar };

// Stryker restore all
/* v8 ignore stop */
