'use client';

import type { MediaKey, Author } from '##/config/contentlayer/blog/authors';
import type { FunctionComponent, ReactNode } from 'react';
import type { Href } from '@rtm/shared-types/Next';

import { AUTHORS_MEDIAS_MAPPING } from '##/config/contentlayer/blog/authors';
import { AUTHOR_TOOLTIP_SIZE } from '@/config/Blog/etc';
import { useCallback, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { TooltipProvider, TooltipContent, TooltipTrigger, Tooltip } from '../Tooltip';

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
        <li
          className="opacity-50 transition-opacity delay-75 duration-300 hover:opacity-100 hover:delay-0 focus:opacity-100 focus:delay-0"
          key={mediaLabel}
        >
          <Link onClick={() => setOpened(false)} className="relative z-[2]" target="_blank" href={href}>
            <__Icon className="h-[22px] w-[22px]" fontSize={22} />
          </Link>
        </li>
      );
    })}
  </ul>
);

const AuthorTooltip: FunctionComponent<AuthorTooltipProps> = ({ hoveredElement, author, alt, bio }) => {
  // https://github.com/QuiiBz/next-international/issues/409
  const hasBio = bio !== '';
  const medias = (author.medias !== undefined ? Object.entries(author.medias) : []) as MediaEntries;
  // eslint-disable-next-line no-magic-numbers
  const hasMedias = medias.length > 0;

  const [opened, setOpened] = useState<boolean>(false);
  const onOpenChange = (opened: boolean) => setOpened(opened);

  const [nextClickOnHoveredElement, setNextClickOnHoveredElement] = useState<boolean>(false);
  const justClosedTooltip = useRef<boolean>(false);

  const setNextClickOnHoveredElementAndJustClosedTooltip = useCallback((v: boolean) => {
    setNextClickOnHoveredElement(v);
    justClosedTooltip.current = v;
  }, []);

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
              href={hoveredElement.href}
              className="relative z-[2]"
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
              className="relative z-[2] rounded-full hover:cursor-pointer"
              src={author.profilePictureUrl}
              height={AUTHOR_TOOLTIP_SIZE}
              width={AUTHOR_TOOLTIP_SIZE}
              draggable={false}
              alt={alt}
            />
          )}
        </TooltipTrigger>

        <TooltipContent className="w-40" side="bottom">
          <div className="flex items-center justify-center space-x-2">
            <Image src={author.profilePictureUrl} height={AUTHOR_TOOLTIP_SIZE} width={AUTHOR_TOOLTIP_SIZE} className="rounded-full" alt={alt} />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{alt}</h4>
            </div>
          </div>
          {hasBio && <p className="mt-2 text-center text-sm">{bio}</p>}
          {hasMedias && generateMedias(medias, setOpened)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AuthorTooltip;

type MediaEntries = [MediaKey, Href][];
