import { cn } from '@/lib/tailwind';
import type { FlexDirection, FlexJustify, FlexWrap } from '@/types/HTML';
import type { LayoutMinimalProps as WithChildren } from '@/types/Next';
import type { FunctionComponent } from 'react';

export interface PaginatedElementsBodyWrapperProps {
  paginatedElementsBodyWrapperProps?: {
    flexWrap?: FlexWrap;
    flexDirection?: FlexDirection;
    flexJustify?: FlexJustify;
    id?: string;
    className?: string;
  };
}

interface IPaginatedElementsBodyWrapperProps extends PaginatedElementsBodyWrapperProps, WithChildren {}

/**
 * @hoc
 */
export const PaginatedElementsBodyWrapper: FunctionComponent<IPaginatedElementsBodyWrapperProps> = ({
  paginatedElementsBodyWrapperProps,
  children
}) => {
  if (!paginatedElementsBodyWrapperProps) return <>{children}</>;

  const {
    flexWrap: flexWrapValue,
    flexDirection: flexDirectionValue,
    flexJustify: flexJustifyValue,
    id: idValue,
    className: classNameValue
  } = paginatedElementsBodyWrapperProps;

  const flexWrap = flexWrapValue ?? 'wrap';
  const flexDirection = flexDirectionValue ?? 'col';
  const flexJustify = flexJustifyValue ?? 'normal';
  const id = idValue ?? undefined;
  const className = cn(`flex-${flexWrap} flex-${flexDirection} justify-${flexJustify}`, classNameValue);

  return <div {...{ className, id }}>{children}</div>;
};

export default PaginatedElementsBodyWrapper;
