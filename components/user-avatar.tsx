'use client';
import { useUser } from '@clerk/nextjs';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export const UserAvatar  = () => {
  const {user} = useUser();
  return (
    <Avatar>
      <AvatarImage src={user?.imageUrl} />
    </Avatar>
  );
};
