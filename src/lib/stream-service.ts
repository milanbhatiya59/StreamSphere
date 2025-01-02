import { db } from "@/lib/db";

export async function getStreamByUserId(userId: string) {
  try {
    const stream = await db.stream.findUnique({
      where: {
        userId,
      },
    });

    return stream;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}
