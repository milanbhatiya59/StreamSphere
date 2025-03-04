"use server";

import { revalidatePath } from "next/cache";
import { Stream } from "@prisma/client";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const updateStream = async (value: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) {
      throw new Error("Stream not found");
    }

    const validData = {
      thumbnailUrl: value.thumbnailUrl,
      name: value.name,
      isChatEnabled: value.isChatEnabled,
      isChatFollowersOnly: value.isChatFollowersOnly,
      isChatDelayed: value.isChatDelayed,
    };

    const stream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/${self.username}`);
    revalidatePath(`/dashboard/${self.username}`);
    revalidatePath(`/dashboard/${self.username}/chat`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Error");
  }
};
