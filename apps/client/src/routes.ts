export enum Routes {
   ROOT = "/",
   DASHBOARD = "/dashboard",
   LOGIN = "/auth/login",
   SIGNUP = "/auth/signup",
}

export const PUBLIC_ROUTES = [Routes.ROOT, Routes.LOGIN, Routes.SIGNUP];
export const PRIVATE_ROUTES = [Routes.DASHBOARD];
