/* v8 ignore start */
// Stryker disable all

import Image from 'next/image';

const NextComponents: Record<PropertyKey, (...args: any[]) => JSX.Element> = {
  // eslint-disable-next-line jsx-a11y/alt-text
  Image: ({ ...props }) => <Image {...props} />
};

export default NextComponents;

// Stryker restore all
/* v8 ignore stop */
