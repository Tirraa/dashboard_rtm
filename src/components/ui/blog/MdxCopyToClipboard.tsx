/* v8 ignore start */
// Stryker disable all

'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { useEffect, useState } from 'react';

import type { CopyToClipboardProps } from './CopyToClipboard';

// https://v3.gatsbyjs.com/docs/mdx/importing-and-using-components/#lazy-loading-components
const MdxCopyToClipboard: FunctionComponent<CopyToClipboardProps> = (props) => {
  const placeholder = <div className="code-block relative">{props.children}</div>;
  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<CopyToClipboardProps>>>(null);
  useEffect(() => {
    import('@/components/ui/blog/CopyToClipboard').then((component) => setComponent(() => component.default));
  }, []);
  if (Component === null) return placeholder;
  return <Component {...props} />;
};

export default MdxCopyToClipboard;

// Stryker restore all
/* v8 ignore stop */
