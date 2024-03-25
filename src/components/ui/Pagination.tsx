import type { ButtonProps } from '@/components/ui/Button';

import { DotsHorizontalIcon, ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/tailwind';
import * as React from 'react';
import Link from 'next/link';

// {ToDo} i18n sr-only and aria-labels

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav className={cn('mx-auto flex w-full justify-center', className)} aria-label="pagination" role="navigation" {...props} />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(({ className, ...props }, ref) => (
  <ul className={cn('flex flex-row items-center gap-1', className)} ref={ref} {...props} />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
  <li className={cn('', className)} ref={ref} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<typeof Link>;

const PaginationLink = ({ size = 'icon', className, isActive, ...props }: PaginationLinkProps) => (
  <Link
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size
      }),
      className
    )}
    aria-current={isActive ? 'page' : undefined}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink className={cn('h-8 gap-1 px-3', className)} aria-label="Go to previous page" size="default" {...props}>
    <ChevronLeftIcon className="h-5 w-5" />
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink className={cn('h-8 gap-1 px-3', className)} aria-label="Go to next page" size="default" {...props}>
    <ChevronRightIcon className="h-5 w-5" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span className={cn('flex h-9 w-9 items-center justify-center', className)} aria-hidden {...props}>
    <DotsHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export { PaginationPrevious, PaginationEllipsis, PaginationContent, PaginationLink, PaginationItem, PaginationNext, Pagination };
