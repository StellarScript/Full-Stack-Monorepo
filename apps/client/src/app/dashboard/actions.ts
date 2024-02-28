"use server";

import { auth } from "@clerk/nextjs";

export const getDashboardAction = async () => {
   const { getToken } = await auth();
   const tokens = await getToken();

   try {
      const response = await fetch("http://localhost:8080/api/user/profile");
      console.log("----response", response.status);
   } catch (error) {
      console.error("----", error);
   }
};
