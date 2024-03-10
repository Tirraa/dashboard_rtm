import type { FunctionComponent } from 'react';

import { useScrollDirection } from '@/components/hooks/useScrollDirection';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { useCallback, useEffect, useState, useRef } from 'react';
import { computeHTMLElementHeight } from '@rtm/shared-lib/html';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { useRouter } from 'next/navigation';
import { getNavbar } from '@/lib/html';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

import type { BlogPostTocDesktopProps } from './BlogPostTocDesktop';

import BlogPostTocCollapseButton, { COLLAPSE_BUTTON_HEIGTH_IN_PX } from './BlogPostTocCollapseButton';

const NIL_IDX = -1;
const HIGHLIGHT_INITIAL_STATE: ActiveHighlightMetas = { idx: NIL_IDX, slug: '' } as const;
const CHIPI_CHIPI_CHAPA_CHAPA_IN_PX: number = 192;
const MAGNETIZED_NAVBAR_Y_SCROLL_THRESHOLD_IN_PX: number = 192;

const visibleElements = {} as Record<HeadingSlug, HeadingSlugIdx>;
let killNextObservableUpdate = false;
let upOffCamWaitForNextObservable = false;

let bottomDeadZone = 0;
let topDeadZone = 0;

const useForcedHighlight = () => {
  const [forcedHighlight, setForcedHighlight] = useState<ActiveHighlightMetas>(HIGHLIGHT_INITIAL_STATE);
  const preparedForcedActiveSlug = useRef<ActiveHighlightMetas>(HIGHLIGHT_INITIAL_STATE);

  const setForcedHighlightAndHighlight = (value: ActiveHighlightMetas) => {
    preparedForcedActiveSlug.current = value;
    setForcedHighlight(value);
  };

  return { setForcedHighlight: setForcedHighlightAndHighlight, preparedForcedActiveSlug, forcedHighlight };
};

function getClosestUpElement(elements: HTMLElement[], fromScreenBottom: boolean = false) {
  let closest = null;
  let closestDistance = Infinity;

  const yStart = fromScreenBottom ? window.scrollY + window.innerHeight - bottomDeadZone : window.scrollY;
  for (const element of elements) {
    const distance = yStart - element.offsetTop;

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (0 < distance && distance < closestDistance) {
      closest = element;
      closestDistance = distance;
    }
  }

  return closest;
}

export interface BlogPostTocDesktopInnerProps extends BlogPostTocDesktopProps {
  ariaLabel: string;
}

const BlogPostTocDesktopInner: FunctionComponent<BlogPostTocDesktopInnerProps> = ({ ariaLabel, headings }) => {
  const [isMagnetized, setIsMagnetized] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const isLargeScreen = useIsLargeScreen();
  const router = useRouter();
  const scrollDirection = useScrollDirection();
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const [, setForceUpdate] = useState<number>(0);
  const [highlight, setHighlight] = useState<ActiveHighlightMetas>(HIGHLIGHT_INITIAL_STATE);
  const { preparedForcedActiveSlug, setForcedHighlight, forcedHighlight } = useForcedHighlight();
  const oldIdx = useRef<number>(NIL_IDX);
  const oldSlug = useRef<string>('');
  const tocRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HTMLOListElement>(null);

  const inferCurrentHighlight = useCallback(() => {
    const elements: HTMLElement[] = [];

    for (const { slug } of headings) {
      const elm = document.getElementById(slug);
      if (elm) elements.push(elm);
    }

    const closest = getClosestUpElement(elements, true);

    if (!closest) return;

    const idx = headings.findIndex((heading) => heading.slug === closest.id);
    if (oldIdx.current !== idx) {
      const hl: ActiveHighlightMetas = { slug: headings[idx].slug, idx };
      oldIdx.current = hl.idx;
      oldSlug.current = hl.slug;

      const headingsInstance = getRefCurrentPtr(headingsRef);

      headingsInstance.scrollTo({
        top: (headingsInstance.children[idx] as HTMLElement).offsetTop - CHIPI_CHIPI_CHAPA_CHAPA_IN_PX,
        behavior: 'smooth'
      });

      setHighlight({ ...hl });
      setForcedHighlight({ ...HIGHLIGHT_INITIAL_STATE });
    }
  }, [headings, setForcedHighlight]);

  useEffect(() => {
    if (!isLargeScreen) return;

    const headingsInstance = getRefCurrentPtr(headingsRef);
    if (!headingsInstance) return;

    const HTMLElement = headingsInstance.children[oldIdx.current];
    if (!HTMLElement) return;

    headingsInstance.scrollTo({
      top: (HTMLElement as HTMLElement).offsetTop - CHIPI_CHIPI_CHAPA_CHAPA_IN_PX,
      behavior: 'smooth'
    });

    killNextObservableUpdate = false;
    upOffCamWaitForNextObservable = false;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    setForceUpdate((prev) => prev + 1);
  }, [isLargeScreen]);

  useEffect(() => {
    function handleNavbarAndTocOverlap() {
      const scrollPosition = window.scrollY;

      if (scrollPosition >= MAGNETIZED_NAVBAR_Y_SCROLL_THRESHOLD_IN_PX) {
        setIsMagnetized(true);
      } else {
        setIsMagnetized(false);
        setIsCollapsed(false);
      }
    }

    function handleScroll() {
      if (!isLargeScreen) return;
      handleNavbarAndTocOverlap();

      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const atTop = window.scrollY === 0;
      const atBottom = window.scrollY + window.innerHeight === document.documentElement.scrollHeight;
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
      const headingsInstance = getRefCurrentPtr(headingsRef);

      headingsInstance.scrollTo({
        top: (headingsInstance.children[newForcedHighlight.idx] as HTMLElement).offsetTop - CHIPI_CHIPI_CHAPA_CHAPA_IN_PX,
        behavior: 'smooth'
      });
      setHighlight({ ...newForcedHighlight });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings, preparedForcedActiveSlug, isLargeScreen]);

  useEffect(() => {
    function handleScrollEnd() {
      if (!isLargeScreen) return;
      preparedForcedActiveSlug.current = HIGHLIGHT_INITIAL_STATE;
    }

    window.addEventListener('scrollend', handleScrollEnd);

    return () => window.removeEventListener('scrollend', handleScrollEnd);
  }, [preparedForcedActiveSlug, isLargeScreen]);

  useEffect(() => {
    function handleHashChange() {
      if (!isLargeScreen) return;
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
  }, [setForcedHighlight, preparedForcedActiveSlug, isLargeScreen]);

  useEffect(() => {
    if (!isLargeScreen) return;

    const tocInstance = getRefCurrentPtr(tocRef);
    const headingsInstance = getRefCurrentPtr(headingsRef);

    if (!tocInstance || !headingsInstance) return;

    function updateScrollOnUncollapse(event: TransitionEvent) {
      const target = event.target as HTMLElement;
      if (target.tagName !== 'NAV') {
        event.stopPropagation();
        return;
      }

      const HTMLElement = headingsInstance.children[oldIdx.current];
      if (!HTMLElement) return;

      headingsInstance.scrollTo({
        top: (HTMLElement as HTMLElement).offsetTop - CHIPI_CHIPI_CHAPA_CHAPA_IN_PX,
        behavior: 'smooth'
      });
    }

    function applyUncollapsedStyles() {
      tocInstance.style.marginTop = '0';
    }

    function applyCollapsedStyles() {
      tocInstance.style.marginTop = '-' + (computeHTMLElementHeight(tocInstance) + COLLAPSE_BUTTON_HEIGTH_IN_PX) + 'px';
    }

    if (!isCollapsed) {
      applyUncollapsedStyles();
      if (oldIdx.current === NIL_IDX) return;

      tocInstance.addEventListener('transitionend', (event) => updateScrollOnUncollapse(event));
      return;
    }

    applyCollapsedStyles();

    return () => tocInstance.removeEventListener('transitionend', updateScrollOnUncollapse);
  }, [isCollapsed, isLargeScreen]);

  useEffect(() => {
    if (!isLargeScreen) return;

    const navbarElement = getNavbar();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const navbarHeight = navbarElement ? computeHTMLElementHeight(navbarElement) : 0;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    bottomDeadZone = navbarHeight * 2;
    topDeadZone = navbarHeight;

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

        const shouldScrollUpUpdateOffCamCase = () =>
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          Object.keys(visibleElements).length === 0 && scrollDirection === 'up' && !upOffCamWaitForNextObservable;

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (Object.keys(visibleElements).length === 0) {
          const elements = [];

          for (const { slug } of headings) {
            const elm = document.getElementById(slug);
            if (elm) elements.push(elm);
          }

          const closest = getClosestUpElement(elements);

          if (!closest) return;

          const idx = headings.findIndex((heading) => heading.slug === closest.id);
          if (oldIdx.current !== idx && scrollDirection === 'up') {
            const hl: ActiveHighlightMetas = { slug: headings[idx].slug, idx };
            oldIdx.current = hl.idx;
            oldSlug.current = hl.slug;

            const headingsInstance = getRefCurrentPtr(headingsRef);

            headingsInstance.scrollTo({
              top: (headingsInstance.children[idx] as HTMLElement).offsetTop - CHIPI_CHIPI_CHAPA_CHAPA_IN_PX,
              behavior: 'smooth'
            });

            setHighlight({ ...hl });
            setForcedHighlight({ ...HIGHLIGHT_INITIAL_STATE });
            return;
          }
        }

        if (killNextObservableUpdate) {
          killNextObservableUpdate = false;
          return;
        }

        if (shouldScrollDownUpdate()) {
          upOffCamWaitForNextObservable = false;

          oldIdx.current = first.idx;
          oldSlug.current = first.slug;
          const headingsInstance = getRefCurrentPtr(headingsRef);

          headingsInstance.scrollTo({
            top: (headingsInstance.children[first.idx] as HTMLElement).offsetTop - CHIPI_CHIPI_CHAPA_CHAPA_IN_PX,
            behavior: 'smooth'
          });

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
          const headingsInstance = getRefCurrentPtr(headingsRef);

          headingsInstance.scrollTo({
            top: (headingsInstance.children[idx] as HTMLElement).offsetTop - CHIPI_CHIPI_CHAPA_CHAPA_IN_PX,
            behavior: 'smooth'
          });

          setHighlight({ ...hl });
          setForcedHighlight({ ...HIGHLIGHT_INITIAL_STATE });
          return;
        } else upOffCamWaitForNextObservable = false;

        oldIdx.current = first.idx;
        oldSlug.current = first.slug;
        const headingsInstance = getRefCurrentPtr(headingsRef);

        headingsInstance.scrollTo({
          top: (headingsInstance.children[first.idx] as HTMLElement).offsetTop - CHIPI_CHIPI_CHAPA_CHAPA_IN_PX,
          behavior: 'smooth'
        });

        setHighlight({ ...first });
        setForcedHighlight({ ...HIGHLIGHT_INITIAL_STATE });
      },
      { rootMargin: `${-topDeadZone}px 0px ${-bottomDeadZone}px 0px`, threshold: 0.5 }
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.slug);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings, preparedForcedActiveSlug, setForcedHighlight, scrollDirection, isLargeScreen]);

  useEffect(
    () => {
      function handleResize() {
        if (!isLargeScreen) return;

        killNextObservableUpdate = false;
        upOffCamWaitForNextObservable = false;

        inferCurrentHighlight();
      }

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLargeScreen]
  );

  useEffect(
    () => {
      inferCurrentHighlight();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (headings.length === 0) return null;

  return (
    <nav className="flex flex-col items-center self-start transition-[margin-top] duration-300" aria-label={ariaLabel} ref={tocRef}>
      <ol className="max-h-[40vh] w-full list-none space-y-3 overflow-auto pl-6 rtl:pl-0 rtl:pr-6" ref={headingsRef}>
        {headings.map((heading, idx) => (
          <li
            className={cn('w-fit list-none text-sm font-bold transition-colors duration-200 ease-in-out hover:text-primary', {
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
                href={'#' + heading.slug}
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
      {(isMagnetized && (
        <BlogPostTocCollapseButton
          className={cn('relative top-6 z-10 opacity-100 transition-opacity duration-200', { 'top-4': isCollapsed })}
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
        />
      )) || (
        <BlogPostTocCollapseButton
          className={cn('relative top-6 z-10 opacity-0 transition-opacity duration-200', { 'top-4': isCollapsed })}
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
          aria-hidden="true"
          isDisabled
        />
      )}
    </nav>
  );
};

type HeadingSlug = string;
type HeadingSlugIdx = number;

type ActiveHighlightMetas = { slug: string; idx: number };

export default BlogPostTocDesktopInner;
