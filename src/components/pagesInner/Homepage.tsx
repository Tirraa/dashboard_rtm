import InviteBotButton from '@/components/misc/InviteBotButton';
import Image from 'next/image';
import { CSSProperties, FunctionComponent } from 'react';

interface HomepageInnerProps {}

// {ToDo} Please, design a real logo
const style: CSSProperties = {
  filter: 'invert(42%) sepia(7%) saturate(5518%) hue-rotate(189deg) brightness(92%) contrast(91%)'
};
const [width, height]: [number, number] = [226, 69];

// {ToDo} i18n this!
export const HomepageInner: FunctionComponent<HomepageInnerProps> = () => (
  <div className="m-auto">
    <Image src="/assets/rtm-txt-logo.svg" {...{ style, width, height }} alt="Rust Team Management (text logo)" />
    <h1 className="mt-2">Rust Team Management</h1>
    <InviteBotButton />
  </div>
);

export default HomepageInner;
