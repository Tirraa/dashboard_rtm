/* v8 ignore start */
// Stryker disable all

'use client';

import { ToastDescription, ToastProvider, ToastViewport, ToastClose, ToastTitle, Toast } from '@/components/ui/toast/Toast';
import { useToast } from '@/components/hooks/useToast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ description, action, title, id, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

// Stryker restore all
/* v8 ignore stop */
