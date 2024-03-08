"use server";

import type { NextRequest } from "next/server";
import type { WebhookEvent } from "@clerk/nextjs/dist/types/server";

import { Webhook } from "svix";
import { request } from "@utils";
import { config } from "@appify/config";

// Forward the signup webhook to the server
export async function POST(req: NextRequest): Promise<Response> {
   try {
      const userObject = await verifyWebhookRequest(req);

      await request("/api/auth/signup", {
         method: "POST",
         body: JSON.stringify(userObject),
      });
      return new Response(JSON.stringify({ status: "OK" }), { status: 200 });
   } catch (error) {
      return new Response(JSON.stringify({ status: "ERROR" }), { status: 401 });
   }
}

async function verifyWebhookRequest(req: Request): Promise<WebhookEvent> {
   const svixId = req.headers.get("svix-id");
   const svixTimestamp = req.headers.get("svix-timestamp");
   const svixSignature = req.headers.get("svix-signature");

   if (!svixId || !svixTimestamp || !svixSignature) {
      throw new Error("Missing required headers");
   }

   const payloadString = JSON.stringify(await req.json());
   try {
      const wh = new Webhook(config.clerk.webhookSecret as string);
      const verifiedWebhookEvent = wh.verify(payloadString, {
         "svix-id": svixId,
         "svix-timestamp": svixTimestamp,
         "svix-signature": svixSignature,
      }) as WebhookEvent;

      return verifiedWebhookEvent;
   } catch (error) {
      console.error("Error verifying webhook request:", error);
      throw new Error("Invalid webhook request.");
   }
}
