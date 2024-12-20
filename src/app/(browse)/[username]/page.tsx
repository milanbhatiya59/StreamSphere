import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser, isBlockUser } from "@/lib/block-service";

interface UserPageProps {
    params: {
        username: string;
    };
}

export default async function UserPage({
    params,
}: UserPageProps) {
    const { username } = await params;

    const user = await getUserByUsername(username);

    if (!user) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);

    const isBlockedbyYou = await isBlockUser(user.id)
    const isBlocked = await isBlockedByUser(user.id)

    if (isBlocked) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-y-4">
            <p>username: {user.username}</p>
            <p>id: {user.id}</p>
            <p>is following: {`${isFollowing}`}</p>
            <p>is blocked by you: {`${isBlockedbyYou}`}</p>
            <p>is blocked: {`${isBlocked}`} </p>
            <Actions userId={user.id} isFollowing={isFollowing} isBlockedbyYou={isBlockedbyYou} />
        </div>
    );
}
