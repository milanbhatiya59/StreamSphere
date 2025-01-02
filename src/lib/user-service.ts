import { db } from "@/lib/db";

export async function getUserByUsername(username: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        externalUserId: true,
        username: true,
        bio: true,
        imageUrl: true,
        stream: {
          select: {
            id: true,
            isLive: true,
            isChatDelayed: true,
            isChatEnabled: true,
            isChatFollowersOnly: true,
            thumbnailUrl: true,
            name: true,
          },
        },
        _count: {
          select: {
            followedBy: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        stream: true,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}