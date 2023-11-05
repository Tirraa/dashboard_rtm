'use client';

import NavbarDropdownButtonIconStyle from '@/components/config/styles/navbar/NavbarDropdownButtonIconStyle';
import NavbarDropdownMenuButtonStyle, {
  NAVBAR_DROPDOWN_MENU_INNER_BUTTONS_CLASSLIST
} from '@/components/config/styles/navbar/NavbarDropdownMenuButtonStyle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { getClientSideI18n } from '@/i18n/client';
import { arePointsEqual } from '@/lib/number';
import { getLinkTarget, getRefCurrentPtr } from '@/lib/react';
import { hrefMatchesPathname } from '@/lib/str';
import { getBreakpoint } from '@/lib/tailwind';
import type { LineSegment, Point } from '@/types/Math';
import type { EmbeddedEntities, NavbarDropdownElement } from '@/types/NavData';
import type { WithOnMouseEnter, WithOnMouseLeave } from '@/types/Next';
import type { PointerDownOutsideEvent } from '@/types/radix-ui';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useMediaQuery } from '@react-hook/media-query';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FunctionComponent, RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

interface NavbarButtonProps extends NavbarDropdownElement, Partial<WithOnMouseEnter & WithOnMouseLeave> {}

const { isActiveClassList: navbarDropdownIsActiveClassList, isNotActiveClassList: navbarDropdownIsNotActiveClassList } =
  NavbarDropdownMenuButtonStyle;

const { isActiveClassList: navbarDropdownBtnIconIsActiveClassList, isNotActiveClassList: navbarDropdownBtnIconIsNotActiveClassList } =
  NavbarDropdownButtonIconStyle;

const menuItemsGenerator = (embeddedEntities: EmbeddedEntities, btnRef: RefObject<HTMLButtonElement>) => {
  const globalT = getClientSideI18n();

  return embeddedEntities.map(({ path: href, i18nTitle }) => {
    const title = globalT(i18nTitle);
    const target = getLinkTarget(href);
    const btnRefCurrentPtr = getRefCurrentPtr(btnRef);
    const minWidth = btnRefCurrentPtr ? window.getComputedStyle(btnRefCurrentPtr).width : '0';

    return (
      <DropdownMenuItem
        key={`${href}-${title}-navbar-menu-item`}
        className="p-0 dark:bg-opacity-20 dark:text-muted-foreground dark:hover:text-primary-foreground"
        textValue={title}
        style={{ minWidth }}
        asChild
      >
        <Link className={NAVBAR_DROPDOWN_MENU_INNER_BUTTONS_CLASSLIST} {...{ title, href, ...target }}>
          {title}
        </Link>
      </DropdownMenuItem>
    );
  });
};

export const NavbarDropdown: FunctionComponent<NavbarButtonProps> = ({
  i18nTitle,
  path: href,
  embeddedEntities,
  withOnMouseEnter,
  withOnMouseLeave
}) => {
  const currentPathname = usePathname();
  const globalT = getClientSideI18n();
  const isLargeScreen = useMediaQuery(`(min-width: ${getBreakpoint('lg')}px)`);
  const btnRef = useRef<HTMLButtonElement>(null);

  const title = globalT(i18nTitle);

  const [isOpened, setIsOpened] = useState<boolean>(false);
  useEffect(() => {
    if (!isLargeScreen) setIsOpened(false);
  }, [isLargeScreen]);

  const navbarDropdownClassName =
    hrefMatchesPathname(href, currentPathname) || isOpened ? navbarDropdownIsActiveClassList : navbarDropdownIsNotActiveClassList;
  const navbarDropdownBtnClassName = isOpened ? navbarDropdownBtnIconIsActiveClassList : navbarDropdownBtnIconIsNotActiveClassList;

  const [OFFSCREEN, MOUSE_POINT_KILLSWITCH] = [-1, -666];
  const mousePointsInitialState = { start: { x: OFFSCREEN, y: OFFSCREEN }, end: { x: OFFSCREEN, y: OFFSCREEN } };
  const mousePoints = useRef<LineSegment>(mousePointsInitialState);

  const onOpenChange = (opened: boolean) => setIsOpened(opened);

  const resetMousePoints = () => (mousePoints.current = mousePointsInitialState);

  const triggerKillswitch = () => {
    const [x, y] = [MOUSE_POINT_KILLSWITCH, MOUSE_POINT_KILLSWITCH];
    const [start, end] = [
      { x, y },
      { x, y }
    ];
    mousePoints.current = { start, end };
  };

  const triggeredKillswitchCtx = () =>
    (['start', 'end'] as (keyof LineSegment)[]).some((lineSegmentPoint) =>
      (['x', 'y'] as (keyof Point)[]).some((axis) => mousePoints.current[lineSegmentPoint][axis] === MOUSE_POINT_KILLSWITCH)
    );

  const onMouseEnter = withOnMouseEnter
    ? (event: React.MouseEvent) => {
        if (triggeredKillswitchCtx()) {
          resetMousePoints();
          return;
        }

        const [start, end] = [{ x: event.clientX, y: event.clientY }, mousePoints.current.end];
        mousePoints.current = { end, start };
        if (arePointsEqual(mousePoints.current.start, mousePoints.current.end, 5)) return;

        setIsOpened(true);
      }
    : undefined;

  const onMouseLeave = withOnMouseLeave ? () => setIsOpened(false) : undefined;

  const onPointerDownOutside = withOnMouseEnter
    ? (event: PointerDownOutsideEvent) => {
        const [x, y] = [event.detail.originalEvent.clientX, event.detail.originalEvent.clientY];
        const [start, end] = [mousePoints.current.start, { x, y }];
        mousePoints.current = { start, end };
      }
    : undefined;

  const onEscapeKeyDown = withOnMouseEnter ? () => triggerKillswitch() : undefined;

  return (
    <DropdownMenu open={isOpened} {...{ onOpenChange }} withDeepResetOnLgBreakpointEvents>
      <DropdownMenuTrigger {...{ onMouseEnter }} asChild>
        <button className={navbarDropdownClassName} ref={btnRef}>
          {title}
          <ChevronDownIcon className={navbarDropdownBtnClassName} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label={title} {...{ onMouseLeave, onPointerDownOutside, onEscapeKeyDown }}>
        {menuItemsGenerator(embeddedEntities, btnRef)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarDropdown;
