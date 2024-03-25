import type { WithClassname, WithChildren } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

interface PaginatedElementsBodyWrapperPropsBase extends Partial<WithClassname> {
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

  const { id = undefined, className } = paginatedElementsBodyWrapperProps;

  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
};

export default PaginatedElementsBodyWrapper;
