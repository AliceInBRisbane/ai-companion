import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


interface BotAvatarProps {
  src: string;
}

const BotAvatar = ({ src }: BotAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default BotAvatar;
