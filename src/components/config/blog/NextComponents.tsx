import Image from 'next/image';

export const NextComponents: Record<string, (...args: any[]) => JSX.Element> = {
  // eslint-disable-next-line jsx-a11y/alt-text
  Image: ({ ...props }) => <Image {...props} />
};

export default NextComponents;
