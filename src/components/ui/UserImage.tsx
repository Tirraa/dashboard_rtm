import type { User } from '@/types/Auth';
import Image from 'next/image';
import type { FunctionComponent } from 'react';

interface UserImageProps {
  user: User;
  width: number;
  height: number;
  className?: string;
}

export const UserImage: FunctionComponent<UserImageProps> = ({ user, width, height, className: classNameValue }) => {
  const className = classNameValue ?? '';
  return user?.image ? <Image {...{ className }} src={user?.image} {...{ width, height }} alt={user?.name ?? ''} priority /> : null;
};

export default UserImage;
