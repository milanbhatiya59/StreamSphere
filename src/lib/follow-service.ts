import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export async function isFollowingUser(userid: string) {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: {
        id: userid,
      },
    });

    if (!otherUser) {
      return false;
    }

    if (self.id === otherUser.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch (error) {
    return false;
  }
}

export async function followUser(userid: string) {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({
    where: {
      id: userid,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (self.id === otherUser.id) {
    throw new Error("you cannot follow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw new Error("You are already following this user");
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      follower: true,
      following: true,
    },
  });

  return follow;
}

export async function unFollowUser(userid: string) {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({
    where: {
      id: userid,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (self.id === otherUser.id) {
    throw new Error("you cannot unfollow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw new Error("You are not following this user");
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return follow;
}

export async function getFollowedUsers() {
  try {
    const self = await getSelf();

    const followedUsers = await db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockedId: self.id,
            },
          },
        },
      },
      include: {
        following: true,
      },
    });

    return followedUsers;
  } catch (error) {
    return [];
  }
}
