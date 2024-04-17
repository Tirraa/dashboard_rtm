'use client';

import type { PxValue } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import Image from 'next/image';

import logoHeadPic from '/public/assets/medias/img/rtm-logo-head.svg';

interface LogoHeadProps {
  priority?: boolean;
  height?: PxValue;
  width?: PxValue;
  alt: string;
}

const LogoHead: FunctionComponent<LogoHeadProps> = ({ priority, height, width, alt }) => (
  <Image priority={priority} src={logoHeadPic} height={height} width={width} alt={alt} />
);
export default LogoHead;
