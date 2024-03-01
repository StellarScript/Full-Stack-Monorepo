import { auth } from "@clerk/nextjs";
import { config } from "@appify/config";

export async function request(urlPath: string, options?: RequestInit): Promise<Response> {
   const _urlPath = urlPath.startsWith("/") ? urlPath.slice(1) : urlPath;
   return await fetch(`${config.app.serverUrl}/${_urlPath}`, options);
}

export async function headers(): Promise<Record<string, string>> {
   const { getToken } = await auth();
   const token = await getToken();
   return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
   };
}
