"use server";

import { auth } from "@clerk/nextjs";

export async function isAuth(): Promise<boolean> {
   try {
      const { sessionClaims } = await auth();
      if (sessionClaims?.sub.includes("user")) {
         return true;
      }
      return false;
   } catch (error) {
      console.error("Error in isAuth", error);
      return false;
   }
}
