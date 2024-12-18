"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    userId: string;
    isFollowing: boolean;
}

export function Actions({
    userId,
    isFollowing,
}: ActionsProps) {

    const [isPending, startTransition] = useTransition()

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => {
                    toast.success(`You are now following ${data.following.username}`)
                }).catch(() => {
                    toast.error("Something went wrong")
                })
        });
    };

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => {
                    toast.success(`You have unfollowed ${data.following.username}`)
                }).catch(() => {
                    toast.error("Something went wrong")
                })
        });
    };

    const onClick = () => {
        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    }

    return (
        <Button
            variant="primary"
            onClick={onClick}
            disabled={isPending}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
}