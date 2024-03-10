import Image from "next/image";
import { cn } from "@utils";

type AvatarProps = {
   src: string;
   alt?: string;
   className?: string;
};

export const Avatar: React.FC<AvatarProps> = ({ className, src, alt = "avatar" }) => (
   <div className="relative cursor-pointer">
      <Image className={cn("w-10 h-10 rounded-full", className)} src={src} alt={alt} width={100} height={100} />
   </div>
);
