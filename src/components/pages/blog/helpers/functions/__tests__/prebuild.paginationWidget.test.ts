// eslint-disable-next-line import/no-extraneous-dependencies
import type { ReactElement } from 'react';

import * as dispatchClickOnLinkOrButtonFirstChild from '@rtm/shared-lib/portable/html/dispatchClickOnLinkOrButtonFirstChild';
import { FIRST_PAGE_PARAM } from '@/components/ui/helpers/PaginatedElements/constants';
import { POINTER_EVENTS_NONE_NEEDLE } from '𝕍/needles';
import { describe, expect, it, vi } from 'vitest';

import { doBuildPaginationItems, buildPreviousBtn, buildDropdown, buildNextBtn } from '../paginationWidget';

const pathname = 'pathname';
const searchParams = new URLSearchParams('?foo=bar&bar=bar&baz=baz');
const pageKey = 'page';

describe('buildNextBtn', () => {
  it('should build an active nextBtn, given a pagesAmount bigger than currentPage', () => {
    const currentPage = 1;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const [nextBtnPageId, pagesAmount] = [currentPage + 1, currentPage + 1];

    const nextBtn = buildNextBtn(nextBtnPageId, pathname, searchParams, currentPage, pagesAmount, pageKey);
    expect(nextBtn.props.href).toBe(`${pathname}?foo=bar&bar=bar&baz=baz&page=2`);
  });

  it('should build a disabled nextBtn, given a currentPage bigger than pagesAmount', () => {
    const pagesAmount = 1;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const [nextBtnPageId, currentPage] = [pagesAmount + 1, pagesAmount + 1];

    const nextBtn = buildNextBtn(nextBtnPageId, pathname, searchParams, currentPage, pagesAmount, pageKey);
    expect(nextBtn.props.className).includes(POINTER_EVENTS_NONE_NEEDLE);
    expect(nextBtn.props['aria-disabled']).toBe(true);
  });

  it('should build a disabled nextBtn, given a currentPage equal to pagesAmount', () => {
    const pagesAmount = 1;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const [nextBtnPageId, currentPage] = [pagesAmount + 1, pagesAmount];

    const nextBtn = buildNextBtn(nextBtnPageId, pathname, searchParams, currentPage, pagesAmount, pageKey);
    expect(nextBtn.props.className).includes(POINTER_EVENTS_NONE_NEEDLE);
    expect(nextBtn.props['aria-disabled']).toBe(true);
  });
});

describe('buildPreviousBtn', () => {
  it('should build an active previousBtn with cleaned page param, given a currentPage just bigger than FIRST_PAGE_PARAM', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const currentPage = FIRST_PAGE_PARAM + 1;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const prevBtnPageId = currentPage - 1;

    const previousBtn = buildPreviousBtn(prevBtnPageId, pathname, searchParams, currentPage, pageKey);
    expect(previousBtn.props.href).toBe(`${pathname}?foo=bar&bar=bar&baz=baz`);
  });

  it('should build an active previousBtn, given a currentPage 2 steps after FIRST_PAGE_PARAM', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const currentPage = FIRST_PAGE_PARAM + 2;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const prevBtnPageId = currentPage - 1;

    const previousBtn = buildPreviousBtn(prevBtnPageId, pathname, searchParams, currentPage, pageKey);
    expect(previousBtn.props.href).toBe(`${pathname}?foo=bar&bar=bar&baz=baz&page=2`);
  });

  it('should build a disabled previousBtn, given a currentPage equal to FIRST_PAGE_PARAM', () => {
    const currentPage = FIRST_PAGE_PARAM;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const prevBtnPageId = currentPage - 1;

    const previousBtn = buildPreviousBtn(prevBtnPageId, pathname, searchParams, currentPage, pageKey);
    expect(previousBtn.props.className).includes(POINTER_EVENTS_NONE_NEEDLE);
    expect(previousBtn.props['aria-disabled']).toBe(true);
  });

  it('should build a disabled previousBtn, given FIRST_PAGE_PARAM is bigger than currentPage', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const currentPage = FIRST_PAGE_PARAM - 1;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const prevBtnPageId = currentPage - 1;

    const previousBtn = buildPreviousBtn(prevBtnPageId, pathname, searchParams, currentPage, pageKey);
    expect(previousBtn.props.className).includes(POINTER_EVENTS_NONE_NEEDLE);
    expect(previousBtn.props['aria-disabled']).toBe(true);
  });
});

describe('doBuildPaginationItems', () => {
  it('should match snapshot (desktop, trivial pagesAmount === 2 case, i.e: 2 parts UI without dropdown)', () => {
    const currentPage = 1;
    const pagesAmount = 2;
    const isLargeScreen = true;
    const paginationItems = doBuildPaginationItems(currentPage, pagesAmount, pathname, searchParams, isLargeScreen, pageKey);

    expect(paginationItems).toMatchSnapshot();
  });

  it('should match snapshot (desktop, trivial pagesAmount === 3 case, i.e: 3 parts UI without dropdown)', () => {
    const currentPage = 1;
    const pagesAmount = 3;
    const isLargeScreen = true;
    const paginationItems = doBuildPaginationItems(currentPage, pagesAmount, pathname, searchParams, isLargeScreen, pageKey);

    expect(paginationItems).toMatchSnapshot();
  });

  it('should match snapshot (desktop, 3 parts UI with dropdown)', () => {
    const currentPage = 1;
    const pagesAmount = 4;
    const isLargeScreen = true;
    const paginationItems = doBuildPaginationItems(currentPage, pagesAmount, pathname, searchParams, isLargeScreen, pageKey);

    expect(paginationItems).toMatchSnapshot();
  });

  it('should match snapshot (desktop, 3 parts UI with dropdown, current page being last page)', () => {
    const pagesAmount = 4;
    const currentPage = pagesAmount;
    const isLargeScreen = true;
    const paginationItems = doBuildPaginationItems(currentPage, pagesAmount, pathname, searchParams, isLargeScreen, pageKey);

    expect(paginationItems).toMatchSnapshot();

    const dispatchClickOnLinkOrButtonFirstChildSpy = vi.spyOn(dispatchClickOnLinkOrButtonFirstChild, 'default');

    const dummyEventTarget = new EventTarget();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    (paginationItems as ReactElement[])[1].props.dropdownItems[0].props.onClick(dummyEventTarget);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(dispatchClickOnLinkOrButtonFirstChildSpy).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot (mobile)', () => {
    const currentPage = 1;
    const pagesAmount = 3;
    const isLargeScreen = false;
    const paginationItems = doBuildPaginationItems(currentPage, pagesAmount, pathname, searchParams, isLargeScreen, pageKey);

    expect(paginationItems).toMatchSnapshot();

    const dispatchClickOnLinkOrButtonFirstChildSpy = vi.spyOn(dispatchClickOnLinkOrButtonFirstChild, 'default');

    const dummyEventTarget = new EventTarget();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    (paginationItems as ReactElement).props.dropdownItems[0].props.onClick(dummyEventTarget);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(dispatchClickOnLinkOrButtonFirstChildSpy).toHaveBeenCalledTimes(1);
  });
});

describe('buildDropdown', () => {
  it('should match snapshot (bottom widget)', () => {
    const currentPage = 1;
    const pagesAmount = 4;
    const isBottomWidget = true;
    const dropdown = buildDropdown(pagesAmount, currentPage, pathname, searchParams, pageKey, isBottomWidget);

    expect(dropdown).toMatchSnapshot();
  });

  it('should match snapshot (NOT bottom widget)', () => {
    const currentPage = 1;
    const pagesAmount = 4;
    const isBottomWidget = false;
    const dropdown = buildDropdown(pagesAmount, currentPage, pathname, searchParams, pageKey, isBottomWidget);

    expect(dropdown).toMatchSnapshot();
  });

  it('should return null, given pagesAmount equal to 1', () => {
    const currentPage = 1;
    const pagesAmount = 1;
    const isBottomWidget = false;
    const dropdown = buildDropdown(pagesAmount, currentPage, pathname, searchParams, pageKey, isBottomWidget);

    expect(dropdown).toBe(null);
  });
});
