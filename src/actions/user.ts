"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateUser(value: Partial<User>) {
  try {
    const self = await getSelf();

    const validData = {
      bio: value.bio,
    };

    const user = await db.user.update({
      where: {
        id: self.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`${self.username}`);
    revalidatePath(`/dashboard/${self.username}`);

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Error");
  }
}
