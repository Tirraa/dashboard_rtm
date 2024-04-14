import type { QuickAccessBtnMetadatas, BannersMetadatas } from '@/config/searchMenu';
import type { KeyboardEvent as ReactKeyboardEvent, FunctionComponent } from 'react';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { hrefAndPathnameExactMatch } from '@/lib/str';
import { getClientSideI18n } from '@/i18n/client';
import { usePathname } from 'next/navigation';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

interface NavbarSearchButtonDialogDefaultViewProps {
  quickMenuLeftRightCustomHandler: (e: ReactKeyboardEvent<HTMLAnchorElement>) => void;
  updateMemorizedTabValueAndSetTabValue: (v: string) => void;
  quickAccessBtns: [string, QuickAccessBtnMetadatas][];
  banners: [string, BannersMetadatas][];
  focusInputField: () => void;
  tabValue: string;
}

const NavbarSearchButtonDialogDefaultView: FunctionComponent<NavbarSearchButtonDialogDefaultViewProps> = ({
  updateMemorizedTabValueAndSetTabValue,
  quickMenuLeftRightCustomHandler,
  focusInputField,
  quickAccessBtns,
  tabValue,
  banners
}) => {
  const globalT = getClientSideI18n();
  const currentPathname = usePathname();

  return (
    <NavigationMenu.Root
      aria-label={globalT(`${i18ns.searchMenuSrOnly}.choose-search-mode`)}
      className="contents [&>div]:contents"
      orientation="vertical"
    >
      <NavigationMenu.List className="contents">
        {banners.map(([category, { icon: __Icon, i18nTitle }], index) => {
          const title = globalT(i18nTitle);
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          const maxIndex = banners.length - 1;

          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          const pos = index === 0 ? EBannerPosition.FIRST : index === maxIndex ? EBannerPosition.LAST : EBannerPosition.MIDDLE;

          return (
            <NavigationMenu.Item className="contents" key={category}>
              <NavigationMenu.Link onKeyDown={(e) => quickMenuLeftRightCustomHandler(e)} asChild>
                <button
                  className={cn(
                    'search-menu-banner flex w-full flex-1 cursor-pointer justify-between bg-accent font-semibold transition-colors hover:bg-primary hover:text-white focus:bg-primary focus:text-white focus:outline-none [&>svg]:hover:border-transparent [&>svg]:focus:border-transparent [&>svg]:dark:hover:border-transparent [&>svg]:dark:focus:border-transparent',
                    { 'rounded-t-md': pos === EBannerPosition.FIRST },
                    { 'rounded-b-md': pos === EBannerPosition.LAST },
                    {
                      'pointer-events-none opacity-50 hover:cursor-default dark:opacity-75 [&>svg]:border-transparent [&>svg]:dark:border-transparent':
                        tabValue === category
                    }
                  )}
                  onClick={() => {
                    updateMemorizedTabValueAndSetTabValue(category);
                    focusInputField();
                  }}
                  aria-label={title}
                >
                  <__Icon className="flex h-full max-h-full min-h-10 w-auto min-w-10 max-w-[10%] rounded-md border border-black border-transparent dark:border-white" />
                  <span className="search-menu-banner-span my-auto flex-1 text-left max-sm:text-base">{title}</span>
                </button>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          );
        })}

        <nav aria-label={globalT(`${i18ns.searchMenuSrOnly}.quick-access`)} className="search-menu-footer flex w-full flex-col">
          <div className="search-menu-footer-items flex w-full flex-wrap justify-center">
            {quickAccessBtns.map(([href, { icon: __Icon, i18nTitle }]) => {
              const exactMatch = hrefAndPathnameExactMatch(href, currentPathname);

              return (
                <NavigationMenu.Item className="flex w-full flex-1 items-center justify-center" key={href}>
                  <NavigationMenu.Link asChild>
                    <Link
                      className={cn(
                        'flex h-fit flex-1 flex-col items-center justify-center rounded-md bg-accent p-4 font-semibold transition-colors hover:bg-primary hover:text-white focus:bg-primary focus:text-white focus:outline-none lg:min-w-[200px]',
                        {
                          'pointer-events-none opacity-50': exactMatch
                        }
                      )}
                      aria-current={exactMatch ? 'page' : undefined}
                      href={href}
                    >
                      <__Icon className="h-10 w-10" />
                      <span className="sr-only">{globalT(i18nTitle)}</span>
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              );
            })}
          </div>
        </nav>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default NavbarSearchButtonDialogDefaultView;

enum EBannerPosition {
  FIRST,
  MIDDLE,
  LAST
}
