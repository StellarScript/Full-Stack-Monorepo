"use server";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { Avatar } from "@components/Avatar";
import { Skeleton } from "@components/Skeleton";

import { Routes } from "@routes";
import { SideMenu } from "./components/SideMenu";
import { ThemeToggle } from "./components/ThemeToggle";
import { getUserProfile, syncAccount } from "./actions";

const Ullustration = dynamic(() => import("@assets/unselected-illustration"), {
   loading: () => <Skeleton />,
});

export default async function DashboardPage() {
   await syncAccount();
   const [error, profile] = await getUserProfile();

   if (error || !profile) {
      redirect(Routes.SIGNOUT);
   }

   return (
      <div className="flex w-full h-screen bg-background transition-all duration-300 ease-in-out overflow-y-hidden">
         <nav className="flex flex-col py-3 w-[90px] border-r border-highlight transition-all duration-300 ease-in-out">
            <div className="p-3 text-center">
               <Link href="/dashboard">
                  <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff1a4e] to-[#1a1aff]">
                     BeLottie
                  </span>
               </Link>
            </div>

            <div className="grid gap-1 justify-center pt-12">
               <SideMenu />
            </div>

            <div className="mt-auto p-3 flex flex-col gap-6 items-center">
               <ThemeToggle />
               <Avatar src={profile?.profileImageUrl} />
            </div>
         </nav>

         <main className="flex-grow p-6">
            <div className="flex text-typography justify-center">
               <Ullustration className="w-[19rem]" />
            </div>
         </main>
      </div>
   );
}
