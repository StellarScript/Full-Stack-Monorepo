import { auth } from "@clerk/nextjs";
import { originUrl } from "@appify/utils";
import { config } from "@appify/config";

export async function request(urlPath: string, options?: RequestInit): Promise<Response> {
   const _urlPath = urlPath.startsWith("/") ? urlPath.slice(1) : urlPath;
   const serverUrl = originUrl(serverPort());
   return await fetch(`${serverUrl}/${_urlPath}`, options);
}

export async function headers(): Promise<Record<string, string>> {
   const { getToken } = await auth();
   const token = await getToken();
   return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
   };
}

export function serverPort(): number {
   if (!config.app.serverPort) {
      throw new Error("Server port is not specified");
   }
   return +config.app.serverPort;
}
