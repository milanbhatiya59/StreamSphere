import { db } from "./db";
import { getSelf } from "./auth-service";

export async function getStreams() {
  try {
    let userId;

    try {
      const self = await getSelf();
      userId = self.id;
    } catch {
      userId = null;
    }

    let streams = [];

    if (userId) {
      streams = await db.stream.findMany({
        where: {
          user: {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        },
        select: {
          user: true,
          isLive: true,
          name: true,
          thumbnailUrl: true,
          id: true,
        },
        orderBy: [
          {
            isLive: "desc",
          },
          {
            updatedAt: "desc",
          },
        ],
      });
    } else {
      streams = await db.stream.findMany({
        select: {
          user: true,
          isLive: true,
          name: true,
          thumbnailUrl: true,
          id: true,
        },
        orderBy: [
          {
            isLive: "desc",
          },
          {
            updatedAt: "desc",
          },
        ],
      });
    }

    return streams;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}
