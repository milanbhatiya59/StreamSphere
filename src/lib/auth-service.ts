import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export async function getSelf() {
  try {
    const user = await currentUser();

    if (!user || !user.username) {
      throw new Error("Unauthorized");
    }

    const self = await db.user.findUnique({
      where: { externalUserId: user.id },
    });

    if (!self) throw new Error("User not found");

    return self;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}

export async function getSelfByUsername(username: string) {
  try {
    const user = await currentUser();

    if (!user || !user.username) {
      throw new Error("Unauthorized");
    }

    const self = await db.user.findUnique({
      where: { username },
    });

    if (!self) throw new Error("User not found");

    if (user.username !== self.username) {
      throw new Error("Unauthorized");
    }

    return self;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}