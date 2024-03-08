'use client';

import type { DocumentHeading } from '@rtm/shared-types/Documents';
import type { FunctionComponent } from 'react';

import { useScrollDirection } from '@/components/hooks/useScrollDirection';
import { computeHTMLElementHeight } from '@rtm/shared-lib/html';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { useEffect, useState, useRef } from 'react';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

import BlogPostTocCollapseButton, { COLLAPSE_BUTTON_HEIGTH_IN_PX } from './BlogPostTocCollapseButton';

type ActiveHighlightMetas = { slug: string; idx: number };

interface BlogPostTocDesktopProps {
  headings: DocumentHeading[];
}

const NIL_IDX = -1;

const HIGHLIGHT_INITIAL_STATE: ActiveHighlightMetas = { idx: NIL_IDX, slug: '' } as const;

const visibleElements = {} as Record<HeadingSlug, HeadingSlugIdx>;

const BlogPostTocDesktop: FunctionComponent<BlogPostTocDesktopProps> = ({ headings }) => {
  const scrollDirection = useScrollDirection();
  const [highlight, setHighlight] = useState<ActiveHighlightMetas>(HIGHLIGHT_INITIAL_STATE);
  const [forcedHighlight, setForcedHighlight] = useState<ActiveHighlightMetas>(HIGHLIGHT_INITIAL_STATE);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const preparedForcedActiveSlug = useRef<ActiveHighlightMetas>(HIGHLIGHT_INITIAL_STATE);
  const wasCollapsed = useRef<boolean>(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HTMLOListElement>(null);

  const scopedT = useScopedI18n(i18ns.vocab);

  // * ... Scroll effect
  useEffect(
    () => {
      function handleScroll() {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const atTop = window.scrollY === 0;
        const atBottom = window.scrollY + window.innerHeight === document.documentElement.scrollHeight;
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const newForcedHighlight: ActiveHighlightMetas = atTop
          ? // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            { slug: headings[0].slug, idx: 0 }
          : atBottom
            ? // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              { slug: headings[headings.length - 1].slug, idx: headings.length - 1 }
            : HIGHLIGHT_INITIAL_STATE;

        if (preparedForcedActiveSlug.current.slug === newForcedHighlight.slug) return;
        preparedForcedActiveSlug.current = { ...newForcedHighlight };
        setHighlight({ ...newForcedHighlight });
      }

      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // * ... Scroll end effect
  useEffect(
    () => {
      function handleScrollEnd() {
        preparedForcedActiveSlug.current = HIGHLIGHT_INITIAL_STATE;
      }

      window.addEventListener('scrollend', handleScrollEnd);

      return () => window.removeEventListener('scrollend', handleScrollEnd);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // * ... Hashchange effect
  useEffect(
    () => {
      function handleHashChange() {
        const giveUp = () =>
          !preparedForcedActiveSlug.current.slug ||
          (highlight.slug === forcedHighlight.slug && preparedForcedActiveSlug.current.slug === forcedHighlight.slug);

        if (giveUp()) return;

        console.log('Updating state: handle hash change!'); // Seems OK
        setForcedHighlight({ ...preparedForcedActiveSlug.current });
        setHighlight({ ...preparedForcedActiveSlug.current });
      }

      window.addEventListener('hashchange', handleHashChange);

      return () => window.removeEventListener('hashchange', handleHashChange);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // * ... Collapse
  useEffect(() => {
    const tocInstance = getRefCurrentPtr(tocRef);
    const headingsInstance = getRefCurrentPtr(headingsRef);

    if (!tocInstance || !headingsInstance) return;

    const EFFECT_CLASSES = ['transition-all', 'duration-300'];

    function applyUncollapsedStyles() {
      tocInstance.style.marginTop = '0';
      headingsInstance.style.opacity = '';
      wasCollapsed.current = false;
    }

    function applyCollapsedStyles() {
      tocInstance.style.marginTop = '-' + (computeHTMLElementHeight(tocInstance) + COLLAPSE_BUTTON_HEIGTH_IN_PX) + 'px';
      headingsInstance.style.opacity = '0';
      wasCollapsed.current = true;
    }

    if (!isCollapsed) {
      if (!wasCollapsed.current) {
        tocInstance.classList.remove(...EFFECT_CLASSES);
        headingsInstance.classList.remove(...EFFECT_CLASSES);
      } else {
        tocInstance.classList.add(...EFFECT_CLASSES);
        headingsInstance.classList.add(...EFFECT_CLASSES);
      }

      applyUncollapsedStyles();
      return;
    }
    if (wasCollapsed.current) tocInstance.classList.remove(...EFFECT_CLASSES);
    else tocInstance.classList.add(...EFFECT_CLASSES);
    applyCollapsedStyles();
  }, [isCollapsed, tocRef, headingsRef]);

  // * ... Highlighting
  useEffect(
    () => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (preparedForcedActiveSlug.current.slug) return;

          let first: ActiveHighlightMetas = HIGHLIGHT_INITIAL_STATE;
          let last: ActiveHighlightMetas = HIGHLIGHT_INITIAL_STATE;

          for (const entry of entries) {
            const slug = entry.target.id;
            if (entry.isIntersecting) {
              visibleElements[slug] = headings.findIndex((heading) => heading.slug === slug);
            } else {
              delete visibleElements[slug];
            }
          }

          for (const [slug, idx] of Object.entries(visibleElements)) {
            if (first.idx === NIL_IDX || idx < first.idx) first = { slug, idx };
            if (last.idx === NIL_IDX || idx > last.idx) last = { slug, idx };
          }

          const oldIdx = highlight.idx;
          const firstIdx = first.idx;
          const lastIdx = last.idx;

          const shouldScrollDownUpdate = () =>
            highlight.slug !== first.slug && firstIdx !== NIL_IDX && scrollDirection === 'down' && (oldIdx === NIL_IDX || oldIdx <= firstIdx);

          const shouldScrollUpUpdate = () =>
            highlight.slug !== last.slug && lastIdx !== NIL_IDX && scrollDirection === 'up' && (oldIdx === NIL_IDX || oldIdx >= lastIdx);

          if (shouldScrollDownUpdate()) {
            setHighlight({ ...first });
            setForcedHighlight({ ...HIGHLIGHT_INITIAL_STATE });
          } else if (shouldScrollUpUpdate()) {
            setHighlight({ ...last });
            setForcedHighlight({ ...HIGHLIGHT_INITIAL_STATE });
          }
        },
        { rootMargin: '-10% 0px', threshold: 1 }
      );

      for (const heading of headings) {
        const element = document.getElementById(heading.slug);
        if (element) observer.observe(element);
      }

      return () => observer.disconnect();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollDirection, preparedForcedActiveSlug.current.slug]
  );

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (headings.length === 0) return null;

  return (
    <nav className="flex flex-col items-center self-start" aria-label={scopedT('toc')} ref={tocRef}>
      <ol className="list-none space-y-3" ref={headingsRef}>
        {headings.map((heading, idx) => (
          <li
            className={cn('list-none text-sm font-bold transition-colors duration-200 ease-in-out hover:text-primary', {
              'text-primary': forcedHighlight.slug === heading.slug || (!forcedHighlight.slug && highlight.slug === heading.slug),
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-6 font-normal': heading.depth === 5,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-2 font-normal': heading.depth === 3,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-4 font-normal': heading.depth === 4
            })}
            key={heading.slug}
          >
            {(!isCollapsed && (
              <Link
                onClick={(event) => {
                  event.preventDefault();
                  preparedForcedActiveSlug.current = { slug: heading.slug, idx };
                  window.dispatchEvent(new Event('hashchange'));
                  document.getElementById(heading.slug)?.scrollIntoView();
                }}
                href={`#${heading.slug}`}
              >
                {heading.content}
              </Link>
            )) || (
              <p className="cursor-default select-none" aria-hidden="true">
                {heading.content}
              </p>
            )}
          </li>
        ))}
      </ol>
      <BlogPostTocCollapseButton setIsCollapsed={setIsCollapsed} className="relative top-5" isCollapsed={isCollapsed} />
    </nav>
  );
};

type HeadingSlug = string;
type HeadingSlugIdx = number;

export default BlogPostTocDesktop;
