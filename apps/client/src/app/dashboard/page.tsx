import { redirect } from "next/navigation";
import { Avatar } from "@components/Avatar";

import { getAccount } from "./actions";
import { SideBar } from "./components/Sidebar";

const avatarItems = [
   { title: "Account", url: "#" },
   { title: "Logout", url: "/auth/logout" },
];

export default async function DashboardPage() {
   const user = await getAccount();

   if (!user) {
      redirect("/auth/login");
   }

   return (
      <div className="flex size-full">
         <div className="size-full">
            <header className="container-lg mx-auto">
               <nav className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 md:justify-between sm:justify-center p-4">
                  <div className="w-full text-center md:text-start text-[31px]">
                     <span className="font-bold leading-[60px] bg-clip-text text-transparent bg-gradient-to-r from-[#df4c6d] to-[#0000fe]">
                        BeLottie
                     </span>
                  </div>
                  <div className="md:flex items-center justify-end hidden">
                     <Avatar imageUrl={user.imageUrl} items={avatarItems} />
                  </div>
               </nav>
            </header>
            <div className="size-full md:pt-[6.75rem] pt-[70px]">
               <div className="container-lg mx-auto md:px-0 px-[33px]">
                  <SideBar />
               </div>
            </div>
         </div>
      </div>
   );
}
