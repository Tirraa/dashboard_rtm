import type { FlexDirection, FlexJustify, FlexWrap } from '@rtm/shared-types/HTML';
import type { WithClassname, WithChildren } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { cn } from '@/lib/tailwind';

interface PaginatedElementsBodyWrapperPropsBase extends Partial<WithClassname> {
  flexDirection?: FlexDirection;
  flexJustify?: FlexJustify;
  flexWrap?: FlexWrap;
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
const PaginatedElementsBodyWrapper: FunctionComponent<IPaginatedElementsBodyWrapperProps> = ({ paginatedElementsBodyWrapperProps, children }) => {
  if (!paginatedElementsBodyWrapperProps) return children;

  const {
    flexDirection: flexDirectionValue,
    flexJustify: flexJustifyValue,
    className: classNameValue,
    flexWrap: flexWrapValue,
    id: idValue
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
