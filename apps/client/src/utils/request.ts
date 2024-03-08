import { auth } from "@clerk/nextjs";
import { originUrl } from "@appify/utils";
import { config } from "@appify/config";

const defaultHeaders = {
   "Content-Type": "application/json",
};

export async function request(urlPath: string, options?: RequestInit): Promise<Response> {
   const _urlPath = urlPath.startsWith("/") ? urlPath.slice(1) : urlPath;
   const serverUrl = originUrl(serverPort());

   return await fetch(`${serverUrl}/${_urlPath}`, {
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

function serverPort(): number {
   const { serverPort } = config.app;
   if (!serverPort) {
      throw new Error("Server port is not specified");
   }
   return +serverPort;
}
