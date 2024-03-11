"use server";

import type { User } from "@clerk/nextjs/dist/types/server";
import { currentUser, clerkClient } from "@clerk/nextjs";
import { authHeaders, request } from "@utils";
import { PublicProfileDto } from "@appify/dto";

type ErrorResponse = { error: string };
type SuccessResponse = { success: boolean };
type SyncResponse = [Nullable<ErrorResponse>, Nullable<SuccessResponse>];
type GetProfileResponse = [Nullable<Error>, Nullable<PublicProfileDto>];

/**
 * Fetches the user's profile details.
 * @returns A promise resolving to either the user's profile or an error.
 */
export const getUserProfile = async (): Promise<GetProfileResponse> => {
   try {
      const headers = await authHeaders();
      const response = await request("/api/user/profile", { headers });
      const profile: PublicProfileDto = await response.json();
      return [null, profile];
   } catch (error) {
      console.error("Error in getting account", error);
      return [error instanceof Error ? error : new Error("Unknown error"), null];
   }
};

/**
 * Synchronizes the user's account by checking their status in private metadata and registering them if necessary.
 * @returns A promise resolving to a SyncResponse indicating the operation's outcome.
 */
export const syncAccount = async (): Promise<SyncResponse> => {
   try {
      const user = await currentUser();
      if (!user) {
         console.error("User not found");
         return [{ error: "User not found" }, null];
      }

      if (user.privateMetadata.sync) {
         return [null, { success: true }];
      }

      await registerUser(user);
      return [null, { success: true }];
   } catch (error) {
      console.error("Error in syncAccount", error);
      return [{ error: "Error syncing user" }, null];
   }
};

/**
 * Registers a user by sending a POST request and updating their metadata to indicate synchronization.
 * @param user The user to be registered.
 */
async function registerUser(user: User): Promise<void> {
   try {
      const headers = await authHeaders();
      const resposne = await request("/api/auth/signup", {
         method: "POST",
         body: JSON.stringify(user),
         headers,
      });

      if (!resposne.ok) {
         throw new Error("Error registering user");
      }
      await clerkClient.users.updateUserMetadata(user.id, {
         privateMetadata: { sync: true },
      });
   } catch (error) {
      console.error("Error in registerUser", error);
      throw new Error("Error registering user");
   }
}
