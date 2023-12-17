import type { ImgHTMLAttributes, HTMLAttributes } from 'react';

import CopyToClipboard from '@/components/ui/blog/CopyToClipboard';
import { cn } from '@/lib/tailwind';

// eslint-disable-next-line no-unused-vars
const PrimitiveComponents: Record<PropertyKey, (...args: any[]) => JSX.Element> = {
  img: ({ className, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md border', className)} alt={alt} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn('border px-4 py-2 font-bold ltr:text-left rtl:text-right [&[align=center]]:text-center [&[align=right]]:text-right', className)}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn('border px-4 py-2 ltr:text-left rtl:text-right [&[align=center]]:text-center [&[align=right]]:text-right', className)}
      {...props}
    />
  ),
  table: ({ className, ...props }: HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  pre: ({ className, ...props }) => (
    <CopyToClipboard>
      <pre className={cn('mb-4 mt-6 overflow-x-auto rounded-lg px-4 py-4', className)} {...props} tabIndex={-1} />
    </CopyToClipboard>
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn('mt-10 flex scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground', className)} {...props} />
  ),
  tr: ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => <tr className={cn('m-0 border-t p-0 even:bg-muted', className)} {...props} />,
  h6: ({ className, ...props }) => <h6 className={cn('mt-8 flex scroll-m-20 text-base font-semibold tracking-tight', className)} {...props} />,
  h3: ({ className, ...props }) => <h3 className={cn('mt-8 flex scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...props} />,
  h4: ({ className, ...props }) => <h4 className={cn('mt-8 flex scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props} />,
  h5: ({ className, ...props }) => <h5 className={cn('mt-8 flex scroll-m-20 text-lg font-semibold tracking-tight', className)} {...props} />,
  h1: ({ className, ...props }) => <h1 className={cn('mt-2 flex scroll-m-20 text-4xl font-bold tracking-tight', className)} {...props} />,
  a: ({ className, ...props }) => <a className={cn('font-medium underline underline-offset-4', className)} {...props} />,
  p: ({ className, ...props }) => <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />,
  ol: ({ className, ...props }) => <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />,
  ul: ({ className, ...props }) => <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />,
  code: ({ className, ...props }) => <code className={cn('bg-inherit', className)} {...props} />,
  li: ({ className, ...props }) => <li className={cn('mt-2', className)} {...props} />,
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />
};

export default PrimitiveComponents;
