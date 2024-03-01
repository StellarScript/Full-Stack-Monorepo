"use server";
import { headers, request } from "@utils";
import { PublicProfileDto } from "@appify/dto";

export const getAccount = async (): Promise<Nullable<PublicProfileDto>> => {
   try {
      const response = await request("/api/user/profile", {
         headers: await headers(),
      });
      return (await response.json()) as PublicProfileDto;
   } catch (error) {
      console.error(error);
      return null;
   }
};
