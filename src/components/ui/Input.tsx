/* v8 ignore start */
// Stryker disable all

import type { InputHTMLAttributes as ReactInputHTMLAttributes } from 'react';

import cn from '@/lib/portable/tailwind/cn';
import { forwardRef } from 'react';

export interface InputProps extends ReactInputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      type={type}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };

// Stryker restore all
/* v8 ignore stop */
