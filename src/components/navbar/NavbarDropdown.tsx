'use client';

import NavbarDropdownButtonStyle, {
  navbarDropdownComponentProps,
  navbarDropdownInnerButtonsClassList
} from '@/components/_config/_styles/NavbarDropdownButtonStyle';
import { LanguageFlag } from '@/config/i18n';
import { getClientSideTranslation } from '@/i18n/client';
import { hrefMatchesPathname } from '@/lib/str';
import i18nTaxonomy from '@/taxonomies/i18n';
import { EmbeddedEntities, NavbarDropdownElement } from '@/types/NavData';
import { i18nComponentProps } from '@/types/Next';
import { ClassName } from '@/types/React';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent, useState } from 'react';

interface NavbarButtonProps extends NavbarDropdownElement, i18nComponentProps {}

const { isActiveClassList, isNotActiveClassList } = NavbarDropdownButtonStyle;
const active: ClassName = { className: isActiveClassList };
const inactive: ClassName = { className: isNotActiveClassList };

const menuItemsGenerator = (embeddedEntities: EmbeddedEntities, lang: LanguageFlag) =>
  embeddedEntities.map(({ path: href, i18nTitleInfos }) => {
    const { targetKey, ns, options } = i18nTitleInfos;
    const { t } = getClientSideTranslation(lang, ns, options);
    const title = t(targetKey);

    return (
      <MenuItem key={href + title} className="p-0">
        <Link className={navbarDropdownInnerButtonsClassList} {...{ title, href }}>
          {title}
        </Link>
      </MenuItem>
    );
  });

export const NavbarDropdown: FunctionComponent<NavbarButtonProps> = ({ i18nProps, i18nTitleInfos, path: href, embeddedEntities }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const currentPathname = usePathname();
  const classList = hrefMatchesPathname(href, currentPathname) || openMenu ? active : inactive;
  const lng = i18nProps[i18nTaxonomy.langFlag];
  const { targetKey, ns, options } = i18nTitleInfos;
  const { t } = getClientSideTranslation(lng, ns, options);
  const title = t(targetKey);

  return (
    <Menu {...navbarDropdownComponentProps} handler={setOpenMenu} open={openMenu}>
      <MenuHandler>
        <div {...classList}>
          {title}
          <ChevronDownIcon className={`transition-all relative top-1 ml-1 h-5 w-5 ${openMenu ? 'rotate-180' : ''}`} aria-hidden="true" />
        </div>
      </MenuHandler>
      <MenuList>{menuItemsGenerator(embeddedEntities, i18nProps[i18nTaxonomy.langFlag])}</MenuList>
    </Menu>
  );
};

export default NavbarDropdown;
