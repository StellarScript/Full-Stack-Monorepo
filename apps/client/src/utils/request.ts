import { auth } from "@clerk/nextjs";
import { config } from "@appify/config";

const defaultHeaders = {
   "Content-Type": "application/json",
};

export async function request(urlPath: string, options?: RequestInit): Promise<Response> {
   const _urlPath = urlPath.startsWith("/") ? urlPath.slice(1) : urlPath;

   return await fetch(`${config.app.serverUrl}/${_urlPath}`, {
      ...options,
      headers: { ...defaultHeaders, ...options?.headers },
   });
}

export async function authHeaders(): Promise<Record<string, string>> {
   const { getToken } = await auth();
   const token = await getToken();
   return {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
   };
}
