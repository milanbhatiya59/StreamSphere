"use client";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
    userId: string;
}

export function UnblockButton({
    userId
}: UnblockButtonProps) {

    const [isPending, startTransition] = useTransition();

    const onClick = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((result) => {
                    toast.success(`You have unblocked ${result.blocked.username}`)
                })
                .catch(() => toast.error("Something went wrong"));
        });
    };

    return (
        <Button
            onClick={onClick}
            disabled={isPending}
            variant="link"
            size="sm"
            className="text-white/80 w-full"
        >
            Unblock
        </Button>
    );
}