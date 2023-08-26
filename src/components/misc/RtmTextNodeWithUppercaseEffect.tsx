import { Properties } from '@/types/React';
import { FunctionComponent } from 'react';

interface RtmTextNodeProps {}

const p: Properties = { className: 'uppercase text-xs' };

export const RtmTextNode: FunctionComponent<RtmTextNodeProps> = () => (
  <>
    R<span {...p}>ust</span> T<span {...p}>eam</span> M<span {...p}>anagement</span>
  </>
);

export default RtmTextNode;
