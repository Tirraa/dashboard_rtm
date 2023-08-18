import { FunctionComponent } from 'react';

interface RtmTextNodeProps {}

const uppercasedStyle = { className: 'uppercase text-xs' };
const p = uppercasedStyle;

const RtmTextNode: FunctionComponent<RtmTextNodeProps> = () => (
  <>
    R<span {...p}>ust</span> T<span {...p}>eam</span> M<span {...p}>anagement</span>
  </>
);

export default RtmTextNode;
