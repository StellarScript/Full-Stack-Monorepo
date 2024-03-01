"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { UseClickAway } from "@hooks/useClickAway";

type AvatarProps = React.PropsWithChildren & {
   imageUrl: string;
};

export const AvatarMenuToggle: React.FC<AvatarProps> = ({ children, imageUrl }) => {
   const [isOpen, setIsOpen] = useState(false);
   const toggleDropdown = () => setIsOpen(!isOpen);

   const ref = useRef(null);
   UseClickAway(ref, () => setIsOpen(false));

   return (
      <div ref={ref}>
         <button
            onClick={toggleDropdown}
            className="block h-10 w-10 rounded-full overflow-hidden border-2 border-gray-200 "
         >
            <Image
               className="h-full w-full object-cover"
               src={imageUrl}
               alt="Profile Avatar"
               width={100}
               height={100}
            />
         </button>
         {isOpen && children}
      </div>
   );
};
