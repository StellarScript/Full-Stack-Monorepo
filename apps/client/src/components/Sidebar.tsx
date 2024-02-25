"use client";

import React, { useState } from "react";
import { Transition } from "@headlessui/react";

const SidebarDrawer = () => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <>
         <button
            className="fixed z-30 flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full top-4 right-4"
            onClick={() => setIsOpen(!isOpen)}
         >
            {isOpen ? "Close" : "Menu"}
         </button>

         <Transition
            show={isOpen}
            enter="transition ease-out duration-150"
            enterFrom="transform opacity-0 -translate-x-20"
            enterTo="transform opacity-100 translate-x-0"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 translate-x-0"
            leaveTo="transform opacity-0 -translate-x-20"
         >
            {(ref) => (
               <div ref={ref} className="fixed z-20 inset-0 overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                     <div
                        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                        onClick={() => setIsOpen(false)}
                     ></div>
                     <section className="absolute inset-y-0 left-0 max-w-full flex outline-none">
                        <div className="relative w-screen max-w-md">
                           <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                              <div className="px-4 sm:px-6">
                                 <div className="flex items-start justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">Menu</h2>
                                    <div className="ml-3 h-7 flex items-center">
                                       <button
                                          onClick={() => setIsOpen(false)}
                                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                                       >
                                          <span className="sr-only">Close panel</span>
                                          {/* Place an icon here if you have one for closing the drawer */}
                                          Close
                                       </button>
                                    </div>
                                 </div>
                              </div>
                              <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                 {/* Place sidebar content here, like navigation links or profile info */}
                              </div>
                           </div>
                        </div>
                     </section>
                  </div>
               </div>
            )}
         </Transition>
      </>
   );
};

export default SidebarDrawer;
