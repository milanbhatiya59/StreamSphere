"use server";

import { revalidatePath } from "next/cache";

import { blockUser, unBlockUser } from "@/lib/block-service";
import { getSelf } from "@/lib/auth-service";
import { RoomServiceClient } from "livekit-server-sdk";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function onBlock(userId: string) {
  try {
    const self = await getSelf();
    let blockedUser;

    try {
      blockedUser = await blockUser(userId);
    } catch {
      //User is Guest
    }

    try {
      //room id is self.id as we define in the ingress
      blockedUser = await roomService.removeParticipant(self.id, userId);
    } catch {
      //This means user is not in the room
    }

    revalidatePath(`/${self.username}`);
    revalidatePath(`/dashboard/${self.username}`);
    revalidatePath(`/dashboard/${self.username}/community`);

    return blockedUser;
  } catch (error) {
    console.log(error);
    throw new Error("Error blocking user");
  }
}

export async function onUnblock(userId: string) {
  try {
    const self = await getSelf();
    const unblockedUser = await unBlockUser(userId);

    revalidatePath(`/`);
    revalidatePath(`/${self.username}`);
    revalidatePath(`/dashboard/${self.username}/community`);

    return unblockedUser;
  } catch (error) {
    console.log(error);
    throw new Error("Error unblocking user");
  }
}
