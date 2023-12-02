import getBreakpoint from '../getBreakpoint';

jest.mock('tailwind.config', () => ({
  theme: {
    screens: {
      sm: '640px',
      md: '768px'
    }
  }
}));

it('should return the correct breakpoint value', () => {
  expect(getBreakpoint('sm')).toBe(640);
  expect(getBreakpoint('md')).toBe(768);
});

it('should return NaN for an invalid breakpoint', () => {
  expect(getBreakpoint('foo' as any)).toBeNaN();
});
