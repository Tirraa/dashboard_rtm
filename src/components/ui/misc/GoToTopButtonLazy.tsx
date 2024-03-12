/* v8 ignore start */
// Stryker disable all

'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { useEffect, useState } from 'react';

import type { GoToTopButtonProps } from './GoToTopButton';

// https://v3.gatsbyjs.com/docs/mdx/importing-and-using-components/#lazy-loading-components
const GoToTopButtonLazy: FunctionComponent<GoToTopButtonProps> = (props) => {
  const placeholder = null;
  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<GoToTopButtonProps>>>(null);
  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    import('@/components/ui/misc/GoToTopButton').then((component) => setComponent(() => component.default));
  }, []);
  if (Component === null) return placeholder;
  return <Component {...props} />;
};

export default GoToTopButtonLazy;

// Stryker restore all
/* v8 ignore stop */
