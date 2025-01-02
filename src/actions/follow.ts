"use server";

import { revalidatePath } from "next/cache";

import { followUser, unFollowUser } from "@/lib/follow-service";

export async function onFollow(userId: string) {
  try {
    const followedUser = await followUser(userId);

    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`${followedUser.following.username}`);
    }

    return followedUser;
  } catch (error) {
    console.log(error);
    throw new Error("Error following user");
  }
}

export async function onUnfollow(userId: string) {
  try {
    const unfollowedUser = await unFollowUser(userId);

    revalidatePath("/");

    if (unfollowedUser) {
      revalidatePath(`${unfollowedUser.following.username}`);
    }

    return unfollowedUser;
  } catch (error) {
    console.log(error);
    throw new Error("Error unfollowing user");
  }
}
