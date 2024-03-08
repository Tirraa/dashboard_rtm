'use client';

import type { FunctionComponent } from 'react';

import DesktopBlogTocCollapseButtonIconStyle, { SIZE_PX_VALUE } from '@/components/config/styles/blogToc/desktopTocCollapseButtonIconStyle';
import { ArrowSmallDownIcon } from '@heroicons/react/20/solid';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

export const COLLAPSE_BUTTON_HEIGTH_IN_PX: number = 30;

interface BlogPostTocCollapseButtonProps {
  setIsCollapsed: Function;
  isCollapsed: boolean;
  className: string;
}

const { isNotActiveClassList: btnIconIsNotActiveClassList, isActiveClassList: btnIconIsActiveClassList } = DesktopBlogTocCollapseButtonIconStyle;

const BlogPostTocCollapseButton: FunctionComponent<BlogPostTocCollapseButtonProps> = ({ className: classNameValue, setIsCollapsed, isCollapsed }) => {
  const className = classNameValue ?? '';

  const tocCollapseBtnIconClassList = isCollapsed ? btnIconIsActiveClassList : btnIconIsNotActiveClassList;

  const tocCollapseBtnClassList = 'relative bottom-1 m-auto w-12 rounded-full rounded-b-full rounded-t-none bg-black dark:bg-card';

  const scopedT = useScopedI18n(`${i18ns.blogToc}.sr-only`);
  const ariaLabel = isCollapsed ? scopedT('show-toc') : scopedT('hide-toc');
  const ariaExpanded = isCollapsed ? 'false' : 'true';
  const type = 'button';

  return (
    <div className="h-0">
      <button
        className={cn(tocCollapseBtnClassList, 'hidden lg:inline', className)}
        style={{ height: COLLAPSE_BUTTON_HEIGTH_IN_PX + 'px' }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-expanded={ariaExpanded}
        aria-label={ariaLabel}
        type={type}
      >
        <ArrowSmallDownIcon className={tocCollapseBtnIconClassList} height={SIZE_PX_VALUE} width={SIZE_PX_VALUE} />
      </button>
    </div>
  );
};

export default BlogPostTocCollapseButton;
