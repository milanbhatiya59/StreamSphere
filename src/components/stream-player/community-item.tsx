"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";

import { Hint } from "../hint";
import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";
import { Button } from "../ui/button";

interface CommunityItemProps {
    hostName: string;
    viewerName: string;
    participantName?: string;
    participantIdentity: string;
}

export function CommunityItem({
    hostName,
    viewerName,
    participantName,
    participantIdentity
}: CommunityItemProps) {

    const [isPending, startTransition] = useTransition();

    const color = stringToColor(participantName || "");
    const isSelf = (participantName === viewerName);
    const isHost = viewerName === hostName;

    const handleBlock = () => {
        if (!participantName || isSelf || !isHost) {
            return;
        }

        startTransition(() => {
            onBlock(participantIdentity)
                .then(() => {
                    toast.success(`You have blocked ${participantName}`)
                }).catch(() => {
                    toast.error("Something went wrong")
                })
        })

    }

    return (
        <div className={cn(
            "group flex items-center justify-between w-full p-3 rounded-md font-semibold hover:bg-white/5",
            isPending && "pointer-events-none opacity-50"

        )}>
            <p style={{ color: color }}>
                {participantName}
            </p>
            {isHost && !isSelf && (
                <Hint label="Block" asChild>
                    <Button
                        className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
                        onClick={handleBlock}
                        disabled={isPending}
                        variant="ghost"
                    >
                        <MinusCircle className="h-6 w-6 text-muted-foreground" />
                    </Button>
                </Hint>
            )}
        </div>
    );
}