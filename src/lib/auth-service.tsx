import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const getSelf = async () => {
    const user = await currentUser();
    if (!user || !user.username) {
        throw new Error("Unauthorized");
    }
    const self = await db.user.findUnique({
        where: { externalUserId: user.id }
    });
    if (!self) throw new Error("User not found");
    return self;
};