/* v8 ignore start */
// Stryker disable all
import Image from 'next/image';

// eslint-disable-next-line no-unused-vars
const NextComponents: Record<PropertyKey, (...args: any[]) => JSX.Element> = {
  // eslint-disable-next-line jsx-a11y/alt-text
  Image: ({ ...props }) => <Image {...props} />
};

export default NextComponents;
/* v8 ignore stop */
// Stryker restore all
