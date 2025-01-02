import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface CreatorPageProps {
    params: Promise<{
        username: string
    }>;
}


export default async function CreatorPage({
    params
}: CreatorPageProps) {

    const { username } = await params;

    if (!username) {
        redirect('/');
    }

    const clerkUser = await currentUser();
    const user = await getUserByUsername(username);

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