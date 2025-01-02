import { db } from "@/lib/db";
import { getSelf } from "@/lib//auth-service";

export const getRecommended = async () => {
  try {
    let userId;

    try {
      const self = await getSelf();
      userId = self.id;
    } catch {
      userId = null;
    }

    let users = [];

    if (userId) {
      users = await db.user.findMany({
        where: {
          AND: [
            {
              NOT: {
                id: userId,
              },
            },
            {
              NOT: {
                followedBy: {
                  some: {
                    followerId: userId,
                  },
                },
              },
            },
            {
              NOT: {
                blocking: {
                  some: {
                    blockedId: userId,
                  },
                },
              },
            },
          ],
        },
        include: {
          stream: {
            select: {
              isLive: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      users = await db.user.findMany({
        include: {
          stream: {
            select: {
              isLive: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while find user");
  }
};