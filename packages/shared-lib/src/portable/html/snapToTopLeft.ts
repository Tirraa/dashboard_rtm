// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const snapToTopLeft = (item?: HTMLElement) =>
  item ? item.scrollTo({ behavior: 'instant', left: 0, top: 0 }) : window.scrollTo({ behavior: 'instant', left: 0, top: 0 });

export default snapToTopLeft;
