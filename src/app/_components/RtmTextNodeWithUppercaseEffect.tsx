import { FunctionComponent } from 'react';

interface RtmTextNodeProps {}

const uppercasedStyle = { className: 'uppercase text-xs' };

const RtmTextNode: FunctionComponent<RtmTextNodeProps> = () => {
  return (
    <>
      R<span {...uppercasedStyle}>ust</span> T<span {...uppercasedStyle}>eam</span> M<span {...uppercasedStyle}>anagement</span>
    </>
  );
};

export default RtmTextNode;
