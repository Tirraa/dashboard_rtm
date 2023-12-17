import type { FunctionComponent, CSSProperties } from 'react';
import type { WithClassname } from '@rtm/shared-types/Next';
import type { User } from '@rtm/shared-types/Auth';

import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/Avatar';

interface UserImageProps extends Partial<WithClassname> {
  height: number;
  width: number;
  user: User;
}

/**
 * @hoc
 * @implements {User} image, name
 * @extends {Avatar}
 */
const UserImage: FunctionComponent<UserImageProps> = ({ height: heightValue, width: widthValue, className, user }) => {
  const src = user?.image ?? '';
  if (!src) return null;

  const height = heightValue + 'px';
  const width = widthValue + 'px';
  const alt = user?.name ?? '';
  const style: CSSProperties = { height, width };

  return (
    <Avatar className={className} style={style}>
      <AvatarImage height={height} width={width} src={src} alt={alt} />
      <AvatarFallback className="sr-only">{alt}</AvatarFallback>
    </Avatar>
  );
};

export default UserImage;
