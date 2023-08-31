import { Properties } from '@/types/React';
import { FunctionComponent } from 'react';

interface RtmTextNodeProps {
  str: string;
}

const p: Properties = { className: 'uppercase text-xs' };

export const TextNodeWithStupidUppercaseEffect: FunctionComponent<RtmTextNodeProps> = ({ str }) => (
  <>
    {str.split('').map((char, index) =>
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

export default TextNodeWithStupidUppercaseEffect;
