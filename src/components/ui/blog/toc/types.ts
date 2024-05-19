import type { DocumentHeading } from '##/config/contentlayer/blog/headings';

export interface SharedBlogPostTocProps {
  headings: DocumentHeading[];
}

interface SharedBlogPostTocInnerProps extends SharedBlogPostTocProps {
  ariaLabel: string;
}

export interface BlogPostTocDesktopInnerProps extends SharedBlogPostTocInnerProps {
  setIsMagnetized: (isMagnetized: boolean) => unknown;
  setIsCollapsed: (isCollapsed: boolean) => unknown;
  isMagnetized: boolean;
  isCollapsed: boolean;
}

export interface BlogPostTocMobileInnerProps extends SharedBlogPostTocInnerProps {}
