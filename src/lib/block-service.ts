import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export async function isBlockUser(userid: string) {
  try {
    const self = await getSelf();

    if (self.id === userid) {
      return true;
    }

    const otherUser = await db.user.findUnique({
      where: {
        id: userid,
      },
    });

    if (!otherUser) {
      return false;
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });

    return !!existingBlock;
  } catch (error) {
    return false;
  }
}

export async function isBlockedByUser(userid: string) {
  try {
    const self = await getSelf();

    if (self.id === userid) {
      return false;
    }

    const otherUser = await db.user.findUnique({
      where: {
        id: userid,
      },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });

    return !!existingBlock;
  } catch (error) {
    return false;
  }
}

export async function blockUser(userid: string) {
  const self = await getSelf();

  if (self.id === userid) {
    throw new Error("you cannot block yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id: userid,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error("You are already blocking this user");
  }

  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
}

export async function unBlockUser(userid: string) {
  const self = await getSelf();

  if (self.id === userid) {
    throw new Error("you cannot unblock yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id: userid,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error("You are not blocking this user");
  }

  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });

  return unblock;
}
