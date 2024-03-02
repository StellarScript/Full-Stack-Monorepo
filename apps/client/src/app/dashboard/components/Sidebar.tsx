"use client";

import { useState } from "react";
import { LucideIcon } from "lucide-react";

import { cn } from "@utils";
import { Icons } from "@components/Icons";

type NavItemProps = {
   id: number;
   icon: LucideIcon;
   label: string;
   isSelected: boolean;
   onClick: (id: number) => void;
};

const navItems = [
   { id: 1, icon: Icons.Home, label: "Home" },
   { id: 2, icon: Icons.Settings, label: "Settings" },
   { id: 3, icon: Icons.Archive, label: "Profile" },
   { id: 4, icon: Icons.MessageSquareText, label: "Messages" },
];

const NavItem: React.FC<NavItemProps> = ({ id, icon: Icon, label, isSelected, onClick }) => (
   <span
      onClick={() => onClick(id)}
      className={cn(
         "flex items-center p-3 rounded-md cursor-pointer transition-colors duration-150",
         isSelected ? "bg-blue-600" : "hover:bg-gray-700",
      )}
      aria-label={label}
   >
      <Icon size="23.5px" />
   </span>
);

export const SideBar = () => {
   const [selected, setSelected] = useState<Nullable<number>>(null);

   return (
      <div className="w-[60px] shadow-lg fixed top-0 left-0 w-64 h-full bg-gray-800 text-white">
         <a
            href="/dashboard"
            className="flex font-bold justify-center leading-[80px] bg-clip-text text-transparent bg-gradient-to-r from-[#ff1a4e] to-[#1a1aff]  text-[28px]"
         >
            B
         </a>
         <nav className="grid justify-center gap-[5.7px] p-3 mt-[7rem]">
            {navItems.map(({ id, icon, label }) => (
               <NavItem key={id} id={id} icon={icon} label={label} isSelected={selected === id} onClick={setSelected} />
            ))}
         </nav>
      </div>
   );
};
