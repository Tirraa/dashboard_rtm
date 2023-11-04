import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import type { User } from '@/types/Auth';
import type { WithClassname } from '@/types/Next';
import type { CSSProperties, FunctionComponent } from 'react';

interface UserImageProps extends Partial<WithClassname> {
  user: User;
  width: number;
  height: number;
}

/**
 * @hoc
 * @implements {User} image, name
 * @extends {Avatar}
 */
export const UserImage: FunctionComponent<UserImageProps> = ({ user, width: widthValue, height: heightValue, className }) => {
  const src = user?.image ?? '';
  if (!src) return null;

  const height = heightValue + 'px';
  const width = widthValue + 'px';
  const alt = user?.name ?? '';
  const style: CSSProperties = { height, width };

  return (
    <Avatar {...{ className, style }}>
      <AvatarImage {...{ src, width, height, alt }} />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  );
};

export default UserImage;
