"use client";

import { useState, FC } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@utils";
import { Icons } from "@components/Icons";

interface NavItemProps {
   id: number;
   Icon: LucideIcon;
   label: string;
   selected: boolean;
   onSelect: (id: number) => void;
}

const NavItem: FC<NavItemProps> = ({ id, Icon, label, selected, onSelect }) => (
   <span
      key={id}
      aria-label={label}
      onClick={() => onSelect(id)}
      className={cn(
         "flex items-center p-5 rounded-md cursor-pointer text-gray-300 dark:text-white hover:text-primary dark:text-typography dark:hover:bg-gray-300 transition-all duration-300 ease-in-out",
         selected && "bg-gray-100 text-primary dark:bg-primary dark:text-white dark:hover:bg-primary",
      )}
   >
      <Icon size="20.5px" />
   </span>
);

const navItems = [
   { id: 1, Icon: Icons.Home, label: "Home" },
   { id: 2, Icon: Icons.Settings, label: "Settings" },
   { id: 3, Icon: Icons.Archive, label: "Profile" },
   { id: 4, Icon: Icons.MessageSquareText, label: "Messages" },
];

export const SideMenu = () => {
   const [selected, setSelected] = useState<number | null>(null);

   return navItems.map(({ id, Icon, label }) => (
      <NavItem key={id} id={id} Icon={Icon} label={label} selected={selected === id} onSelect={setSelected} />
   ));
};
