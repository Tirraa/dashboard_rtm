'use client';

import type { WithClassname } from '@rtm/shared-types/Next';
import type { PxValue } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import DesktopBlogTocCollapseButtonIconStyle from '@/components/config/styles/blogToc/desktopTocCollapseButtonIconStyle';
import { ArrowDownIcon } from '@radix-ui/react-icons';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

export const COLLAPSE_BUTTON_HEIGTH_IN_PX: PxValue = 30;

interface BlogPostTocCollapseButtonProps extends Partial<WithClassname> {
  setIsCollapsed: (isCollapsed: boolean) => unknown;
  isCollapsed: boolean;
  isDisabled?: boolean;
}

const { isNotActiveClassList: btnIconIsNotActiveClassList, isActiveClassList: btnIconIsActiveClassList } = DesktopBlogTocCollapseButtonIconStyle;

const BlogPostTocCollapseButton: FunctionComponent<BlogPostTocCollapseButtonProps> = ({
  className: classNameValue,
  setIsCollapsed,
  isCollapsed,
  isDisabled
}) => {
  const className = classNameValue ?? '';

  const tocCollapseBtnIconClassList = isCollapsed ? btnIconIsActiveClassList : btnIconIsNotActiveClassList;

  const tocCollapseBtnClassList = 'relative bottom-1 m-auto w-12 rounded-full rounded-b-full rounded-t-none bg-black dark:bg-card';

  const scopedT = useScopedI18n(`${i18ns.blogToc}.sr-only`);
  const ariaLabel = isCollapsed ? scopedT('show-toc') : scopedT('hide-toc');
  const ariaExpanded = isCollapsed ? 'false' : 'true';
  const type = 'button';

  return (
    <div className="h-0">
      {(!isDisabled && (
        <button
          className={cn(tocCollapseBtnClassList, 'hidden lg:inline', className)}
          style={{ height: COLLAPSE_BUTTON_HEIGTH_IN_PX + 'px' }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-expanded={ariaExpanded}
          aria-label={ariaLabel}
          type={type}
        >
          <ArrowDownIcon className={tocCollapseBtnIconClassList} />
        </button>
      )) || (
        <div
          className={cn(tocCollapseBtnClassList, 'hidden cursor-default lg:inline', className)}
          style={{ height: COLLAPSE_BUTTON_HEIGTH_IN_PX + 'px' }}
          aria-hidden="true"
        >
          <ArrowDownIcon className={tocCollapseBtnIconClassList} />
        </div>
      )}
    </div>
  );
};

export default BlogPostTocCollapseButton;
