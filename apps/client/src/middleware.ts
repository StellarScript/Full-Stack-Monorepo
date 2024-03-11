import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { PUBLIC_ROUTES, Routes } from "@routes";

export default authMiddleware({
   publicRoutes: PUBLIC_ROUTES,
   afterAuth: (auth, req) => {
      if (!auth.userId && !auth.isPublicRoute) {
         return NextResponse.redirect(new URL(Routes.LOGIN, req.url));
      }
      return NextResponse.next();
   },
});

export const config = {
   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
