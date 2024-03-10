import { redirect } from "next/navigation";
import { Avatar } from "@components/Avatar";

import { getAccount } from "./actions";
import { SideBar } from "./components/Sidebar";
import { ThemeButton } from "../components/themeButton";

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
      <div className="flex flex-col size-full justify-center">
         <header className="w-full border-b-[1px] border-gray-100 p-1 pr-3">
            <div className="md:flex items-center justify-end hidden p-1">
               <ThemeButton />
               <Avatar imageUrl={user.imageUrl} items={avatarItems} />
            </div>
         </header>
         <SideBar />
         <div className="h-screen ml-[60px]">
            <div className="size-full">
               <h1 className="text-white">Hello</h1>
            </div>
         </div>
      </div>
   );
}
