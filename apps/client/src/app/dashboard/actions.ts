"use server";

import { authHeaders, request } from "@utils";
import { PublicProfileDto } from "@appify/dto";

export const getAccount = async (): Promise<Nullable<PublicProfileDto>> => {
   try {
      const response = await request("/api/user/profile", {
         headers: await authHeaders(),
      });
      return (await response.json()) as PublicProfileDto;
   } catch (error) {
      console.error(error);
      return null;
   }
};
