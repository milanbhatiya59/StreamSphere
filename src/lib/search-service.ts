import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export async function getSearch(search_query?: string) {
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
          OR: [
            {
              name: {
                contains: search_query,
              },
            },
            {
              user: {
                username: {
                  contains: search_query,
                },
              },
            },
          ],
        },
        select: {
          user: true,
          id: true,
          name: true,
          thumbnailUrl: true,
          isLive: true,
          updatedAt: true,
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
        where: {
          OR: [
            {
              name: {
                contains: search_query,
              },
            },
            {
              user: {
                username: {
                  contains: search_query,
                },
              },
            },
          ],
        },
        select: {
          user: true,
          id: true,
          name: true,
          thumbnailUrl: true,
          updatedAt: true,
          isLive: true,
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
    throw new Error("Something went wrong while searching!");
  }
}
