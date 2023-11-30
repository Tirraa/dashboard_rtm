import Image from 'next/image';

export const NextComponents: Record<PropertyKey, (...args: any[]) => JSX.Element> = {
  // eslint-disable-next-line jsx-a11y/alt-text
  Image: ({ ...props }) => <Image {...props} />
};

export default NextComponents;
