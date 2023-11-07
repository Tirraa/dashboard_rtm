import { cn } from '@/lib/tailwind';
import type { FlexDirection, FlexJustify, FlexWrap } from '@/types/HTML';
import type { WithChildren, WithClassname } from '@/types/Next';
import type { FunctionComponent } from 'react';

interface PaginatedElementsBodyWrapperPropsBase extends Partial<WithClassname> {
  flexWrap?: FlexWrap;
  flexDirection?: FlexDirection;
  flexJustify?: FlexJustify;
  id?: string;
}

export interface PaginatedElementsBodyWrapperProps {
  paginatedElementsBodyWrapperProps?: PaginatedElementsBodyWrapperPropsBase;
}

interface IPaginatedElementsBodyWrapperProps extends PaginatedElementsBodyWrapperProps, WithChildren {}

/**
 * @hoc
 * @extends {children} - Extra styling?
 * @implements {IPaginatedElementsBodyWrapperProps}
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

  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
};

export default PaginatedElementsBodyWrapper;
