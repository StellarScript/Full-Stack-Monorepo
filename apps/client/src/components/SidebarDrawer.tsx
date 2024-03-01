import { cn } from "@utils";
import { Icons } from "@components/Icons";

type SidebarDrawerProps = React.PropsWithChildren & {
   isOpen: boolean;
   toggle: () => void;
};

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ children, isOpen, toggle }) => (
   <div className="relative min-h-screen">
      <div
         className={cn(
            "transition-transform duration-500 ease-in-out fixed top-0 left-0 w-64 h-full bg-gray-800 text-white",
            `transform ${isOpen ? "translate-x-0" : "-translate-x-[200px]"}`,
         )}
      >
         {children}
         <div className="absolute right-0 bottom-0 p-4">
            <button onClick={toggle} className="flex w-full justify-center hover:text-gray-300 p-1">
               <Icons.Maximize2 size={"20px"} />
            </button>
         </div>
      </div>
   </div>
);
