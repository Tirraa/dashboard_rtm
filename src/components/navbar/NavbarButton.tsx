'use client';

import NavbarButtonStyle from '@/components/_config/_styles/NavbarButtonStyle';
import { getClientSideTranslation } from '@/i18n/client';
import { getLinkTarget } from '@/lib/react';
import { hrefMatchesPathname } from '@/lib/str';
import i18nTaxonomy from '@/taxonomies/i18n';
import { AtomicNavDataEntity } from '@/types/NavData';
import { i18nComponentProps } from '@/types/Next';
import { ClassName } from '@/types/React';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';

interface NavbarButtonProps extends AtomicNavDataEntity, i18nComponentProps {}

const active: ClassName = { className: NavbarButtonStyle.isActiveClassList };
const inactive: ClassName = { className: NavbarButtonStyle.isNotActiveClassList };

export const NavbarButton: FunctionComponent<NavbarButtonProps> = ({ i18nProps, i18nTitleInfos, path: href }) => {
  const lng = i18nProps[i18nTaxonomy.langFlag];
  const { targetKey, ns, options } = i18nTitleInfos;
  const { t } = getClientSideTranslation(lng, ns, options);
  const title = t(targetKey);

  const currentPathname = usePathname();
  const classList = hrefMatchesPathname(href, currentPathname) ? active : inactive;
  const target = getLinkTarget(href);

  return <Link {...{ ...classList, href, ...target }}>{title}</Link>;
};

export default NavbarButton;
