"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
    hostIdentity: string;
    isFollowing: boolean;
    isHost: boolean;
}

export function Actions({
    hostIdentity,
    isFollowing,
    isHost
}: ActionsProps) {

    const [isPending, startTransition] = useTransition();
    const { userId } = useAuth();
    const router = useRouter();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => {
                    toast.success(`You are now following ${data.following.username}`)
                }).catch(() => {
                    toast.error("Something went wrong")
                })
        });
    };

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then((data) => {
                    toast.success(`You have unfollowed ${data.following.username}`)
                }).catch(() => {
                    toast.error("Something went wrong")
                })
        });
    };

    const toggleFollow = () => {
        if (!userId) {
            return router.push("/sign-in");
        }

        if (isHost) {
            return;
        }

        if (isFollowing) {
            handleUnFollow();
        } else {
            handleFollow();
        }
    }

    return (
        <Button
            onClick={toggleFollow}
            disabled={isHost || isPending}
            variant="default"
            size="sm"
            className="bg-white hover:bg-white/10 hover:text-white text-black font-semibold"
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}

export function ActionsSkeleton() {
    return (
        <Skeleton className="h-10 w-full lg:w-24" />
    )
}