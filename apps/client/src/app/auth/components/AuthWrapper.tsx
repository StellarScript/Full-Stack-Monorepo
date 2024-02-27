import React from "react";
import { ClerkLoading } from "@clerk/nextjs";
import { Skeleton } from "@components/Skeleton";

export const AuthWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
   <div className="flex size-full">
      <div className="flex size-full justify-center items-center pt-32">
         <ClerkLoading>
            <Skeleton className="w-[400px] items-center flex-col h-[470px] rounded-[20px] bg-[#f9f9f9]">
               <Skeleton className="w-[80%] rounded-[20px] bg-[#f2f2f2] h-[2.5rem] items-center mt-[-21rem] rounded-[8px] px-[3rem] delay-500"></Skeleton>
               <Skeleton className="w-[80%] rounded-[20px] bg-[#f2f2f2] h-[2.5rem] items-center mt-[7rem] rounded-[8px] px-[3rem] delay-500"></Skeleton>
               <Skeleton className="w-[80%] rounded-[20px] bg-[#f2f2f2] h-[2.5rem] items-center mt-[1rem] rounded-[8px] px-[3rem]"></Skeleton>
            </Skeleton>
         </ClerkLoading>
         {children}
      </div>
   </div>
);
