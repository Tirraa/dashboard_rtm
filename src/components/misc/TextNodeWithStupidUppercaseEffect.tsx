import { ClassName } from '@/types/React';
import { FunctionComponent } from 'react';

interface RtmTextNodeProps {
  str: string;
}

const PROPS: ClassName = { className: 'uppercase text-xs' };

export const TextNodeWithStupidUppercaseEffect: FunctionComponent<RtmTextNodeProps> = ({ str }) => (
  <>
    {str.split('').map((char, index) =>
      char.toLowerCase() === char ? (
        <span key={index} {...PROPS}>
          {char}
        </span>
      ) : (
        <span key={index}>{char}</span>
      )
    )}
  </>
);

export default TextNodeWithStupidUppercaseEffect;
