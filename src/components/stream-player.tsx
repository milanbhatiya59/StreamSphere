"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { User, Stream } from "@prisma/client"

interface StreamPlayerProps {
    user: User & {
        stream: Stream | null
    }
    stream: Stream;
    isFollowing: boolean
}

export function StreamPlayer({
    user,
    stream,
    isFollowing
}: StreamPlayerProps) {


    const {
        token,
        name,
        identity,
    } = useViewerToken(user.id);

    if (!token || !name || !identity) {
        return (
            <div>
                Cannot watch the Stream
            </div>
        );
    }

    return (
        <div>
            Allowed to watch the Stream
        </div>
    );
}