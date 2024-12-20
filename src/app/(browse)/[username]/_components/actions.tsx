"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { isValidElement, useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    userId: string;
    isFollowing: boolean;
    isBlockedbyYou: boolean;
}

export function Actions({
    userId,
    isFollowing,
    isBlockedbyYou,
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

    const onClickFollow = () => {
        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => {
                    toast.success(`You have blocked ${data.blocked.username}`)
                }).catch(() => {
                    toast.error("Something went wrong")
                })
        })
    }

    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => {
                    toast.success(`You have unblocked ${data.blocked.username}`)
                }).catch(() => {
                    toast.error("Something went wrong")
                })
        })
    }

    const onClickBlock = () => {
        if (isBlockedbyYou) {
            handleUnblock();
        } else {
            handleBlock();
        }
    }

    return (
        <>
            <Button
                onClick={onClickFollow}
                disabled={isPending}
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button
                disabled={isPending}
                onClick={onClickBlock}
            >
                {isBlockedbyYou ? "Unblock" : "Block"}
            </Button>
        </>
    );
}