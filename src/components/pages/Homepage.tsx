/* v8 ignore start */
// Stryker disable all
'use client';

import type { FunctionComponent, CSSProperties } from 'react';

import InviteTheBotButton from '@/components/ui/cta/MdxInviteTheBotButton';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import Image from 'next/image';
interface HomepageProps {}

const style: CSSProperties = {
  filter: 'invert(42%) sepia(7%) saturate(5518%) hue-rotate(189deg) brightness(92%) contrast(91%)'
};
const [width, height]: [number, number] = [226, 69];

const Homepage: FunctionComponent<HomepageProps> = () => {
  const scopedT = useScopedI18n(i18ns.vocab);
  const alt = scopedT('sr-only.brand-logo');
  const brand = scopedT('brand');

  return (
    <div className="text-center">
      <Image src="/assets/rtm-txt-logo.svg" className="m-auto" height={height} style={style} width={width} alt={alt} priority />
      <h1 className="mt-2">{brand}</h1>
      <InviteTheBotButton />
    </div>
  );
};

export default Homepage;
// Stryker restore all
/* v8 ignore stop */
