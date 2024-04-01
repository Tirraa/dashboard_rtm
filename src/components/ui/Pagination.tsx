import type { ButtonProps } from '@/components/ui/Button';
import type { Count } from '@rtm/shared-types/Numbers';

import { DotsHorizontalIcon, ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { DropdownMenuTrigger, DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { buttonVariants } from '@/components/ui/Button';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';
import * as React from 'react';
import Link from 'next/link';

import { DropdownMenuContent } from './DropdownMenu';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => {
  const scopedT = useScopedI18n(i18ns.vocab);

  return <nav className={cn('mx-auto flex w-full justify-center', className)} aria-label={scopedT('pagination')} role="navigation" {...props} />;
};
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(({ className, ...props }, ref) => (
  <ul className={cn('flex flex-row items-center gap-1', className)} ref={ref} {...props} />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
  <li className={className} ref={ref} {...props} />
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

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => {
  const scopedT = useScopedI18n(i18ns.vocab);

  return (
    <PaginationLink className={cn('h-8 gap-1 px-3', className)} aria-label={scopedT('prev')} size="default" {...props}>
      <ChevronLeftIcon className="h-5 w-5" />
    </PaginationLink>
  );
};
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => {
  const scopedT = useScopedI18n(i18ns.vocab);

  return (
    <PaginationLink className={cn('h-8 gap-1 px-3', className)} aria-label={scopedT('next')} size="default" {...props}>
      <ChevronRightIcon className="h-5 w-5" />
    </PaginationLink>
  );
};
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  pageNumberIndicator,
  isBottomWidget,
  dropdownItems,
  className,
  ...props
}: React.ComponentProps<'button'> & { dropdownItems: React.ReactElement[]; pageNumberIndicator?: Count; isBottomWidget?: boolean }) => {
  const scopedT = useScopedI18n(i18ns.vocab);
  const [isOpened, setIsOpened] = React.useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (dropdownItems.length === 0) return null;

  const onOpenChange = (opened: boolean) => setIsOpened(opened);

  return (
    <DropdownMenu onOpenChange={onOpenChange} open={isOpened}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-md border-none font-bold hover:bg-accent hover:text-accent-foreground',
            {
              'bg-accent text-accent-foreground': isOpened
            },
            className
          )}
          {...props}
        >
          {pageNumberIndicator !== undefined ? <span>{pageNumberIndicator}</span> : <DotsHorizontalIcon className="h-4 w-4" />}
          <span className="sr-only">{scopedT('more-pages')}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(event) => {
          if (isBottomWidget) event.preventDefault();
        }}
        onClick={() => {
          if (isBottomWidget) setIsOpened(false);
        }}
        className="w-fit"
      >
        {dropdownItems}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

PaginationEllipsis.displayName = 'PaginationEllipsis';

export { PaginationPrevious, PaginationEllipsis, PaginationContent, PaginationLink, PaginationItem, PaginationNext, Pagination };
