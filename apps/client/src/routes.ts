export enum Routes {
   ROOT = "/",
   DASHBOARD = "/dashboard",
   LOGIN = "/auth/login",
   SIGNUP = "/auth/signup",
}

export enum ApiRoutes {
   HEALTH = "/api/health",
}

export const PUBLIC_ROUTES = [Routes.ROOT, Routes.LOGIN, Routes.SIGNUP, ApiRoutes.HEALTH];
export const PRIVATE_ROUTES = [Routes.DASHBOARD];
