'use client';

import SidebarButtonStyle from '@/components/_config/_styles/SidebarButtonStyle';
import ROUTES_ROOTS from '@/config/routes';
import { getClientSideI18n } from '@/i18n/client';
import { hrefMatchesPathname } from '@/lib/str';
import { AppPath } from '@/types/Next';
import { ClassName } from '@/types/React';
import { I18nVocabTarget } from '@/types/i18n';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentType, FunctionComponent } from 'react';
import { IconBaseProps } from 'react-icons';

interface DashboardSidebarButtonProps {
  href: AppPath;
  i18nTitle: I18nVocabTarget;
  __SidebarIcon: ComponentType<IconBaseProps>;
}

const { isActiveClassList, isNotActiveClassList, sidebarIconProps } = SidebarButtonStyle;
const ACTIVE: ClassName = { className: isActiveClassList };
const INACTIVE: ClassName = { className: isNotActiveClassList };
const ICON_PROPS = { ...sidebarIconProps };

export const DashboardSidebarButton: FunctionComponent<DashboardSidebarButtonProps> = ({ __SidebarIcon, href, i18nTitle }) => {
  const currentPathname = usePathname();
  const globalT = getClientSideI18n();
  const classList: ClassName = hrefMatchesPathname(href, currentPathname, ROUTES_ROOTS.DASHBOARD) ? ACTIVE : INACTIVE;
  const title = globalT(i18nTitle);

  return (
    <Link {...{ title, href, ...classList }}>
      <span className="sr-only">{title}</span>
      <__SidebarIcon {...ICON_PROPS} />
    </Link>
  );
};

export default DashboardSidebarButton;
