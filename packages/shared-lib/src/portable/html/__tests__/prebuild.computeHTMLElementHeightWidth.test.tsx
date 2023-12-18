import type { FunctionComponent } from 'react';

import { afterAll, describe, expect, it, vi } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';

import computeHTMLElementHeight from '../computeHTMLElementHeight';
import computeHTMLElementWidth from '../computeHTMLElementWidth';

const FakeComponent: FunctionComponent<{}> = () => <div data-testid="fake-component" />;

vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => {
  return {
    bottom: 1029,
    height: 1234,
    right: 3250,
    width: 2500,
    left: 4321,
    top: 1200
  } as DOMRect;
});

vi.spyOn(window, 'getComputedStyle').mockImplementation(() => {
  return {
    marginBottom: '121px',
    marginRight: '302px',
    marginLeft: '928px',
    marginTop: '810px'
  } as CSSStyleDeclaration;
});
vi.resetModules();

describe('computeHTMLElementHeight/computeHTMLElementWidth', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should return the correct height/width of an element', () => {
    render(<FakeComponent />);
    const fakeComponent = screen.getByTestId('fake-component');
    expect(computeHTMLElementHeight(fakeComponent)).toBe(2165);
    expect(computeHTMLElementWidth(fakeComponent)).toBe(3730);
  });
});
