import { StreamPlayer } from "@/components/stream-player";
import { isBlockedByUser } from "@/lib/block-service";
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";

type Params = Promise<{ username: string }>;

export default async function UserPage({
    params,
}: {
    params: Params;
}) {
    const { username } = await params;

    const user = await getUserByUsername(username);

    if (!user || !user.stream) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlock = await isBlockedByUser(user.id);

    if (isBlock) {
        notFound();
    }

    return (
        <StreamPlayer
            user={user}
            stream={user.stream}
            isFollowing={isFollowing}
        />
    );
}
