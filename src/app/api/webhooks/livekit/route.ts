import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { db } from "@/lib/db";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = await headers();
  const authorization = headerPayload.get("Authorization");

  if (!authorization) {
    return new Response("Error: Missing Authorization header", { status: 400 });
  }

  let event;
  try {
    event = receiver.receive(body, authorization);
  } catch (error) {
    return new Response("Invalid webhook signature", { status: 400 });
  }

  try {
    if (event.event === "ingress_started") {
      await db.stream.update({
        where: { ingressId: event.ingressInfo?.ingressId },
        data: { isLive: true },
      });
    }

    if (event.event === "ingress_ended") {
      await db.stream.update({
        where: { ingressId: event.ingressInfo?.ingressId },
        data: { isLive: false },
      });
    }
  } catch (dbError) {
    return new Response("Error updating database", { status: 500 });
  }

  return new Response("Webhook processed successfully", { status: 200 });
}
