"use server";

import { revalidatePath } from "next/cache";

import { blockUser, unBlockUser } from "@/lib/block-service";

export async function onBlock(userId: string) {
  //TODO : Adapt to disconnnect from livestream
  //TODO : Allow ability to kick the guest

  try {
    const blockedUser = await blockUser(userId);

    revalidatePath("/");

    if (blockedUser) {
      revalidatePath(`${blockedUser.blocked.username}`);
    }

    return blockedUser;
  } catch (error) {
    throw new Error("Error blocking user");
  }
}

export async function onUnblock(userId: string) {
  try {
    const unblockedUser = await unBlockUser(userId);

    revalidatePath("/");

    if (unblockedUser) {
      revalidatePath(`${unblockedUser.blocked.username}`);
    }

    return unblockedUser;
  } catch (error) {
    throw new Error("Error unblocking user");
  }
}
