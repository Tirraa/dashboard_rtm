'use client';

import { getPathnameWithoutI18nPart } from '@/lib/i18n';
/* eslint-disable max-len */

// A Next.js Top Loading Bar component made using nprogress, works with Next.js 13.
// https://github.com/TheSGJ/nextjs-toploader
// https://www.npmjs.com/package/nextjs-toploader
// Copyright (c) 2023 Shri Ganesh Jha

/**
 *
 * NextTopLoader
 *
 */

/* eslint-disable prefer-const */
/* eslint-disable quotes */

import nProgress from 'nprogress';
import * as PropTypes from 'prop-types';
import * as React from 'react';
export type NextTopLoaderProps = {
  /**
   * Color for the TopLoader.
   * @default "#29d"
   */
  color?: string;
  /**
   * The initial position for the TopLoader in percentage, 0.08 is 8%.
   * @default 0.08
   */
  initialPosition?: number;
  /**
   * The increament delay speed in milliseconds.
   * @default 200
   */
  crawlSpeed?: number;
  /**
   * The height for the TopLoader in pixels (px).
   * @default 3
   */
  height?: number;
  /**
   * Auto increamenting behaviour for the TopLoader.
   * @default true
   */
  crawl?: boolean;
  /**
   * To show spinner or not.
   * @default true
   */
  showSpinner?: boolean;
  /**
   * Animation settings using easing (a CSS easing string).
   * @default "ease"
   */
  easing?: string;
  /**
   * Animation speed in ms for the TopLoader.
   * @default 200
   */
  speed?: number;
  /**
   * Defines a shadow for the TopLoader.
   * @default "0 0 10px ${color},0 0 5px ${color}"
   *
   * @ you can disable it by setting it to `false`
   */
  shadow?: string | false;
};

const NextTopLoader = ({
  color: propColor,
  height: propHeight,
  showSpinner,
  crawl,
  crawlSpeed,
  initialPosition,
  easing,
  speed,
  shadow
}: NextTopLoaderProps) => {
  const defaultColor = '#29d';
  const defaultHeight = 3;

  const color = propColor ?? defaultColor;
  const height = propHeight ?? defaultHeight;

  const boxShadow = !shadow && shadow !== undefined ? '' : shadow ? `box-shadow:${shadow}` : `box-shadow:0 0 10px ${color},0 0 5px ${color}`;

  const styles = (
    <style>
      {`#nprogress{pointer-events:none}#nprogress .bar{background:${color};position:fixed;z-index:1031;top:0;left:0;width:100%;height:${height}px}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;${boxShadow};opacity:1;-webkit-transform:rotate(3deg) translate(0px,-4px);-ms-transform:rotate(3deg) translate(0px,-4px);transform:rotate(3deg) translate(0px,-4px)}#nprogress .spinner{display:block;position:fixed;z-index:1031;top:15px;right:15px}#nprogress .spinner-icon{width:18px;height:18px;box-sizing:border-box;border:2px solid transparent;border-top-color:${color};border-left-color:${color};border-radius:50%;-webkit-animation:nprogress-spinner 400ms linear infinite;animation:nprogress-spinner 400ms linear infinite}.nprogress-custom-parent{overflow:hidden;position:relative}.nprogress-custom-parent #nprogress .bar,.nprogress-custom-parent #nprogress .spinner{position:absolute}@-webkit-keyframes nprogress-spinner{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes nprogress-spinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}
    </style>
  );

  React.useEffect(() => {
    nProgress.configure({
      showSpinner: showSpinner ?? true,
      trickle: crawl ?? true,
      trickleSpeed: crawlSpeed ?? 200,
      minimum: initialPosition ?? 0.08,
      easing: easing ?? 'ease',
      speed: speed ?? 200
    });

    function isAnchorOfCurrentUrl(currentUrl: string, newUrl: string) {
      const currentUrlObj = new URL(currentUrl);
      const newUrlObj = new URL(newUrl);

      if (currentUrlObj.origin !== newUrlObj.origin) {
        return true;
      } else if (getPathnameWithoutI18nPart(currentUrlObj.pathname) !== getPathnameWithoutI18nPart(newUrlObj.pathname)) {
        return false;
      }
      return true;
    }

    // eslint-disable-next-line no-var
    var npgclass = document.querySelectorAll('html');
    function findClosestAnchor(element: HTMLElement | null): HTMLAnchorElement | null {
      while (element && element.tagName.toLowerCase() !== 'a') {
        element = element.parentElement;
      }
      return element as HTMLAnchorElement;
    }

    function handleClick(event: MouseEvent) {
      if (event.ctrlKey) return;
      try {
        const target = event.target as HTMLElement;
        const anchor = findClosestAnchor(target);
        if (anchor) {
          const currentUrl = window.location.href;
          const newUrl = (anchor as HTMLAnchorElement).href;
          const isExternalLink = (anchor as HTMLAnchorElement).target === '_blank';
          const isSamePage = isAnchorOfCurrentUrl(currentUrl, newUrl);
          if (isSamePage || isExternalLink) return;

          nProgress.start();
          (() => {
            const history = window.history;
            const pushState = history.pushState;
            history.pushState = function () {
              nProgress.done();
              [].forEach.call(npgclass, function (el: Element) {
                el.classList.remove('nprogress-busy');
              });
              // eslint-disable-next-line prefer-rest-params
              return pushState.apply(history, arguments as any);
            };
          })();
        }
      } catch {
        nProgress.start();
        nProgress.done();
      }
    }

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [crawl, crawlSpeed, easing, initialPosition, showSpinner, speed]);

  return styles;
};
export default NextTopLoader;

NextTopLoader.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  showSpinner: PropTypes.bool,
  crawl: PropTypes.bool,
  crawlSpeed: PropTypes.number,
  initialPosition: PropTypes.number,
  easing: PropTypes.string,
  speed: PropTypes.number,
  shadow: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};