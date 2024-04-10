/* v8 ignore start */
// Stryker disable all

'use client';

import type { I18nVocabTarget } from '@rtm/shared-types/I18n';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { getClientSideI18n } from '@/i18n/client';
import { cn } from '@/lib/tailwind';
import * as React from 'react';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    ref={ref}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { closeButtonI18nTitle: I18nVocabTarget; closeButtonClassName?: string }
>(({ closeButtonI18nTitle, closeButtonClassName, className, children, ...props }, ref) => {
  const globalT = getClientSideI18n();

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background pb-10 pt-10 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg ltr:pl-10 ltr:pr-6 rtl:pl-6 rtl:pr-10',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        <div className="sticky left-0 top-0 h-0 w-0 self-start ltr:right-2.5 rtl:left-2.5">
          <DialogPrimitive.Close
            className={cn(
              'absolute bottom-1 rounded-full bg-accent p-1 text-muted-foreground ring-offset-background transition-all hover:bg-primary hover:text-white focus:bg-primary focus:text-white focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none dark:opacity-70 dark:hover:text-inherit dark:hover:opacity-100 dark:focus:text-inherit dark:focus:opacity-100',
              closeButtonClassName
            )}
          >
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">{globalT(closeButtonI18nTitle)}</span>
          </DialogPrimitive.Close>
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title className={cn('text-lg font-semibold leading-none tracking-tight', className)} ref={ref} {...props} />
  )
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => <DialogPrimitive.Description className={cn('text-sm text-muted-foreground', className)} ref={ref} {...props} />);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export { DialogDescription, DialogOverlay, DialogTrigger, DialogContent, DialogPortal, DialogHeader, DialogFooter, DialogClose, DialogTitle, Dialog };

// Stryker restore all
/* v8 ignore stop */
