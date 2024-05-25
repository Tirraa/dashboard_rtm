'use client';

import type { MediaKey, Author } from '##/config/contentlayer/blog/authors';
import type { FunctionComponent, ReactNode } from 'react';
import type { Href } from '@rtm/shared-types/Next';

import { AUTHORS_MEDIAS_MAPPING } from '##/config/contentlayer/blog/authors';
import { APPROX_120_FPS_THROTTLE_TIMING_IN_MS } from '@/config/throttling';
import { useCallback, useEffect, useState, useRef } from 'react';
import { AUTHOR_TOOLTIP_SIZE } from '@/config/Blog/etc';
import { getFooter, getNavbar } from '@/lib/html';
import throttle from 'throttleit';
import Image from 'next/image';
import Link from 'next/link';

import { TooltipProvider, TooltipContent, TooltipTrigger, Tooltip } from '../Tooltip';
import { Separator } from '../Separator';

export interface AuthorTooltipProps {
  hoveredElement?: {
    title: string;
    href: Href;
  };
  author: Author;
  alt: string;
  bio: string;
}

const generateMedias = (medias: MediaEntries, setOpened: (opened: boolean) => unknown): ReactNode => (
  <ul className="m-auto my-2 flex w-fit max-w-[112px] flex-wrap gap-2">
    {medias.map(([mediaLabel, href]) => {
      const __Icon = AUTHORS_MEDIAS_MAPPING[mediaLabel];

      return (
        <li className="opacity-50 hover:opacity-100 focus:opacity-100" key={mediaLabel}>
          <Link
            onClick={(e) => {
              if (e.ctrlKey) return;
              setOpened(false);
            }}
            className="relative z-[2]"
            target="_blank"
            href={href}
          >
            <__Icon className="h-[22px] w-[22px]" fontSize={22} />
          </Link>
        </li>
      );
    })}
  </ul>
);

const AuthorTooltip: FunctionComponent<AuthorTooltipProps> = ({ hoveredElement, author, alt, bio }) => {
  // {ToDo} Buggy atm - https://github.com/QuiiBz/next-international/issues/409
  const hasBio = bio !== '';
  const medias = (author.medias !== undefined ? Object.entries(author.medias) : []) as MediaEntries;
  // eslint-disable-next-line no-magic-numbers
  const hasMedias = medias.length > 0;

  const [opened, setOpened] = useState<boolean>(false);
  const [footerIsVisible, setFooterIsVisible] = useState<boolean>(false);

  const onOpenChange = (opened: boolean) => setOpened(opened);
  const maybeFooter = getFooter();

  const [nextClickOnHoveredElement, setNextClickOnHoveredElement] = useState<boolean>(false);
  const justClosedTooltip = useRef<boolean>(false);

  const setNextClickOnHoveredElementAndJustClosedTooltip = useCallback((v: boolean) => {
    setNextClickOnHoveredElement(v);
    justClosedTooltip.current = v;
  }, []);

  useEffect(() => {
    if (maybeFooter === null) return;

    function handleScroll() {
      if (maybeFooter === null) return;

      const documentHeight = document.body.scrollHeight;
      const currentBottomPx = Math.ceil(window.scrollY + window.innerHeight);
      const distanceFromPageBottom = Math.abs(currentBottomPx - documentHeight);

      if (distanceFromPageBottom <= maybeFooter.getBoundingClientRect().height) setFooterIsVisible(true);
      else setFooterIsVisible(false);
    }

    const throttledScrollHandler = throttle(handleScroll, APPROX_120_FPS_THROTTLE_TIMING_IN_MS);

    window.addEventListener('scroll', throttledScrollHandler);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, [maybeFooter]);

  return (
    <TooltipProvider skipDelayDuration={50} delayDuration={200}>
      <Tooltip onOpenChange={onOpenChange} open={opened}>
        <TooltipTrigger asChild>
          {hoveredElement !== undefined && nextClickOnHoveredElement ? (
            <Link
              onMouseEnter={() => {
                if (justClosedTooltip.current) {
                  justClosedTooltip.current = false;
                  return;
                }

                if (hoveredElement !== undefined) setNextClickOnHoveredElement(false);
              }}
              className="group-hover:relative group-hover:z-[2]"
              href={hoveredElement.href}
            >
              <Image
                className="relative rounded-full hover:cursor-pointer"
                src={author.profilePictureUrl}
                height={AUTHOR_TOOLTIP_SIZE}
                width={AUTHOR_TOOLTIP_SIZE}
                draggable={false}
                alt={alt}
              />
              <span className="sr-only">{hoveredElement.title}</span>
            </Link>
          ) : (
            <Image
              onClick={() => {
                if (hoveredElement === undefined) return;

                if (nextClickOnHoveredElement) {
                  if (opened) setNextClickOnHoveredElementAndJustClosedTooltip(false);
                  return;
                }

                setNextClickOnHoveredElementAndJustClosedTooltip(true);
              }}
              onMouseEnter={() => hoveredElement !== undefined && setNextClickOnHoveredElementAndJustClosedTooltip(false)}
              className="rounded-full hover:cursor-pointer group-hover:relative group-hover:z-[2]"
              src={author.profilePictureUrl}
              height={AUTHOR_TOOLTIP_SIZE}
              width={AUTHOR_TOOLTIP_SIZE}
              draggable={false}
              alt={alt}
            />
          )}
        </TooltipTrigger>

        <TooltipContent collisionBoundary={footerIsVisible ? [maybeFooter, getNavbar()] : undefined} className="w-40 py-2.5" side="bottom">
          <div className="flex flex-col items-center justify-center space-y-1">
            <Image src={author.profilePictureUrl} className="rounded-full" draggable={false} height={125} width={125} alt={alt} />
            <div className="space-y-1">
              <span className="text-md font-semibold">{alt}</span>
            </div>
          </div>
          {hasBio && <p className="mt-2 text-center text-sm">{bio}</p>}
          {hasMedias && <Separator className="mx-auto my-1 w-full" orientation="horizontal" />}
          {hasMedias && generateMedias(medias, setOpened)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AuthorTooltip;

type MediaEntries = [MediaKey, Href][];
