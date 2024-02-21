// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const scrollToTop = (item?: HTMLElement) => (item ? item.scrollTo(0, 0) : window.scrollTo(0, 0));
export default scrollToTop;
