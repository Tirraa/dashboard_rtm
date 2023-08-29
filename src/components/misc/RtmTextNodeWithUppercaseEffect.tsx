import UniversalVocab from '@/i18n/locales/UniversalVocab';
import { Properties } from '@/types/React';
import { FunctionComponent } from 'react';

interface RtmTextNodeProps {}

const p: Properties = { className: 'uppercase text-xs' };

export const RtmTextNode: FunctionComponent<RtmTextNodeProps> = () => (
  <>
    {UniversalVocab.brand.split('').map((char, index) =>
      char.toLowerCase() === char ? (
        <span key={index} {...p}>
          {char}
        </span>
      ) : (
        <span key={index}>{char}</span>
      )
    )}
  </>
);

export default RtmTextNode;
