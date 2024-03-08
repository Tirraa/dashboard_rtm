import type { FunctionComponent } from 'react';

import { useScrollDirection } from '@/components/hooks/useScrollDirection';
import { computeHTMLElementHeight } from '@rtm/shared-lib/html';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getNavbar } from '@/lib/html';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

import type { BlogPostTocDesktopProps } from './BlogPostTocDesktop';

import BlogPostTocCollapseButton, { COLLAPSE_BUTTON_HEIGTH_IN_PX } from './BlogPostTocCollapseButton';

const NIL_IDX = -1;
const HIGHLIGHT_INITIAL_STATE: ActiveHighlightMetas = { idx: NIL_IDX, slug: '' } as const;

const visibleElements = {} as Record<HeadingSlug, HeadingSlugIdx>;
let killNextObservableUpdate = false;
let upOffCamWaitForNextObservable = false;

const useForcedHighlight = () => {
  const [forcedHighlight, setForcedHighlight] = useState<ActiveHighlightMetas>(HIGHLIGHT_INITIAL_STATE);
  const preparedForcedActiveSlug = useRef<ActiveHighlightMetas>(HIGHLIGHT_INITIAL_STATE);

  const setForcedHighlightAndHighlight = (value: ActiveHighlightMetas) => {
    preparedForcedActiveSlug.current = value;
    setForcedHighlight(value);
  };

  return { setForcedHighlight: setForcedHighlightAndHighlight, preparedForcedActiveSlug, forcedHighlight };
};

function getClosestUpElement(elements: HTMLElement[]) {
  let closest = null;
  let closestDistance = Infinity;

  for (const element of elements) {
    const distance = window.scrollY - element.offsetTop;

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (0 < distance && distance < closestDistance) {
      closest = element;
      closestDistance = distance;
    }
  }

  return closest;
}

interface BlogPostTocDesktopInnerProps extends BlogPostTocDesktopProps {
  ariaLabel: string;
}

const BlogPostTocDesktopInner: FunctionComponent<BlogPostTocDesktopInnerProps> = ({ ariaLabel, headings }) => {
  const router = useRouter();
  const scrollDirection = useScrollDirection();
  const [highlight, setHighlight] = useState<ActiveHighlightMetas>(HIGHLIGHT_INITIAL_STATE);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const { preparedForcedActiveSlug, setForcedHighlight, forcedHighlight } = useForcedHighlight();
  const oldIdx = useRef<number>(NIL_IDX);
  const oldSlug = useRef<string>('');
  const wasCollapsed = useRef<boolean>(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
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
      if (newForcedHighlight.idx === NIL_IDX) return;

      oldIdx.current = newForcedHighlight.idx;
      oldSlug.current = newForcedHighlight.slug;
      setHighlight({ ...newForcedHighlight });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings, preparedForcedActiveSlug]);

  useEffect(() => {
    function handleScrollEnd() {
      preparedForcedActiveSlug.current = HIGHLIGHT_INITIAL_STATE;
    }

    window.addEventListener('scrollend', handleScrollEnd);

    return () => window.removeEventListener('scrollend', handleScrollEnd);
  }, [preparedForcedActiveSlug]);

  useEffect(() => {
    function handleHashChange() {
      const giveUp = () => !preparedForcedActiveSlug.current.slug;

      if (giveUp()) return;

      killNextObservableUpdate = true;
      oldIdx.current = preparedForcedActiveSlug.current.idx;
      oldSlug.current = preparedForcedActiveSlug.current.slug;
      setForcedHighlight({ ...preparedForcedActiveSlug.current });
      setHighlight({ ...preparedForcedActiveSlug.current });
    }

    window.addEventListener('my-hashchange', handleHashChange);

    return () => window.removeEventListener('my-hashchange', handleHashChange);
  }, [setForcedHighlight, preparedForcedActiveSlug]);

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

  useEffect(() => {
    const navbarElement = getNavbar();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const navbarHeight = navbarElement ? computeHTMLElementHeight(navbarElement) : 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (preparedForcedActiveSlug.current.slug) return;

        let first: ActiveHighlightMetas = HIGHLIGHT_INITIAL_STATE;

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
        }

        const _oldIdx = oldIdx.current;
        const firstIdx = first.idx;

        const shouldScrollDownUpdate = () =>
          oldSlug.current !== first.slug && firstIdx !== NIL_IDX && scrollDirection === 'down' && (_oldIdx === NIL_IDX || _oldIdx <= firstIdx);

        const shouldScrollUpUpdate = () =>
          oldSlug.current !== first.slug && firstIdx !== NIL_IDX && scrollDirection === 'up' && (_oldIdx === NIL_IDX || _oldIdx >= firstIdx);

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const shouldScrollUpUpdateOffCamCase = () =>
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          Object.keys(visibleElements).length === 0 && scrollDirection === 'up' && !upOffCamWaitForNextObservable;

        if (killNextObservableUpdate) {
          killNextObservableUpdate = false;
          return;
        }

        if (shouldScrollDownUpdate()) {
          upOffCamWaitForNextObservable = false;

          oldIdx.current = first.idx;
          oldSlug.current = first.slug;
          setHighlight({ ...first });
          setForcedHighlight({ ...HIGHLIGHT_INITIAL_STATE });
          return;
        }

        const upOffCamCtx = shouldScrollUpUpdateOffCamCase();
        if (!shouldScrollUpUpdate() && !upOffCamCtx) return;

        if (upOffCamCtx) {
          const elements = [];

          for (const { slug } of headings) {
            const elm = document.getElementById(slug);
            if (elm) elements.push(elm);
          }

          const closest = getClosestUpElement(elements);

          if (!closest) return;

          upOffCamWaitForNextObservable = true;

          const idx = headings.findIndex((heading) => heading.slug === closest.id);
          const hl: ActiveHighlightMetas = { slug: headings[idx].slug, idx };
          oldIdx.current = hl.idx;
          oldSlug.current = hl.slug;
          setHighlight({ ...hl });
          setForcedHighlight({ ...HIGHLIGHT_INITIAL_STATE });
          return;
        } else upOffCamWaitForNextObservable = false;

        oldIdx.current = first.idx;
        oldSlug.current = first.slug;
        setHighlight({ ...first });
        setForcedHighlight({ ...HIGHLIGHT_INITIAL_STATE });
      },
      { rootMargin: -navbarHeight + 'px 0px 0px 0px', threshold: 0.5 }
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.slug);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings, preparedForcedActiveSlug, setForcedHighlight, scrollDirection]);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (headings.length === 0) return null;

  return (
    <nav className="flex flex-col items-center self-start" aria-label={ariaLabel} ref={tocRef}>
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
                  window.dispatchEvent(new Event('my-hashchange'));
                  router.replace('#' + heading.slug, { scroll: true });
                }}
                href={`#${heading.slug}`}
                replace
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

type ActiveHighlightMetas = { slug: string; idx: number };

export default BlogPostTocDesktopInner;
