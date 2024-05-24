'use client';

import type { Author } from '##/config/contentlayer/blog/authors';
import type { FunctionComponent } from 'react';

import { HoverCardContent, HoverCardTrigger, HoverCard } from '@/components/ui/HoverCard';
import Image from 'next/image';

export interface AuthorHoverCardProps {
  author: Author;
  alt: string;
  bio: string;
}

const AuthorHoverCard: FunctionComponent<AuthorHoverCardProps> = ({ author, alt, bio }) => {
  // https://github.com/QuiiBz/next-international/issues/409
  const hasBio = bio !== '';

  return (
    <HoverCard openDelay={200} closeDelay={50}>
      <HoverCardTrigger asChild>
        <Image className="h-[40px] w-[40px] rounded-full" src={author.profilePictureUrl} height={40} width={40} alt={alt} />
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex items-center justify-center space-x-4">
          <Image className="h-[40px] w-[40px] rounded-full" src={author.profilePictureUrl} height={40} width={40} alt={alt} />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{alt}</h4>
          </div>
        </div>
        {hasBio && <p className="mt-2 text-center text-sm">{bio}</p>}
      </HoverCardContent>
    </HoverCard>
  );
};

export default AuthorHoverCard;
