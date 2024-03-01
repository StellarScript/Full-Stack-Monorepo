"use client";

import { useState } from "react";
import { Icons } from "@components/Icons";
import { SidebarDrawer } from "@components/SidebarDrawer";

export const SideBar = () => {
   const [isOpen, setIsOpen] = useState(true);

   return (
      <SidebarDrawer isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
         <nav className="transition-transform duration-700 ease-in-out p-5">
            {isOpen && (
               <>
                  <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700">
                     <Icons.Layout size="20px" />
                     <span>Home</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700">
                     <Icons.Layout size="20px" />
                     About
                  </a>
                  <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700">
                     <Icons.Layout size="20px" />
                     Services
                  </a>
                  <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700">
                     <Icons.Layout size="20px" />
                     Contact
                  </a>
               </>
            )}

            {!isOpen && (
               <div className="flex justify-end">
                  <Icons.Layout size="20px" />
               </div>
            )}
         </nav>
      </SidebarDrawer>
   );
};
