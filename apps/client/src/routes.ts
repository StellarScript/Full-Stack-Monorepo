export enum Routes {
   ROOT = "/",
   DASHBOARD = "/dashboard",
   SIGNIN = "/auth/login",
   SIGNUP = "/auth/signup",
   SIGNOUT = "/auth/logout",
}

export enum ApiRoutes {
   HEALTH = "/api/health",
   SIGNUP = "/api/signup",
}

export const PUBLIC_ROUTES = [Routes.ROOT, Routes.SIGNIN, Routes.SIGNUP, ApiRoutes.HEALTH, ApiRoutes.SIGNUP];
export const PRIVATE_ROUTES = [Routes.DASHBOARD];
