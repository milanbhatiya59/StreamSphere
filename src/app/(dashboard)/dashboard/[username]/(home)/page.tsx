import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";

interface CreatorPageProps {
    params: {
        username: string
    }
}


export default async function CreatorPage({
    params
}: CreatorPageProps) {

    const clerkUser = await currentUser();
    const user = await getUserByUsername((await params).username);

    if (!user || user.externalUserId !== clerkUser?.id || !user.stream) {
        throw new Error("Unauthorized");
    }

    return (
        <div className="h-full">
            <StreamPlayer
                user={user}
                stream={user.stream}
                isFollowing
            />
        </div>
    );
};