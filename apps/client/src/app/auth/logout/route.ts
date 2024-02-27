import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/api";
import { Routes } from "@routes";
import { redirect } from "next/navigation";

export async function GET() {
   const { sessionId } = auth();
   if (!sessionId) {
      return redirect(Routes.ROOT);
   }
   await clerkClient.sessions.revokeSession(sessionId);
   return redirect(Routes.ROOT);
}
