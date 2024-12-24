"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatInfo } from "./chat-info";

interface ChatFormProps {
    onSubmit: () => void;
    value: string;
    onChange: (value: string) => void;
    isHidden: boolean;
    isFollowersOnly: boolean;
    isDelayed: boolean;
    isFollowing: boolean;
};

export function ChatForm({
    onSubmit,
    value,
    onChange,
    isHidden,
    isFollowersOnly,
    isDelayed,
    isFollowing,
}: ChatFormProps) {

    const [isDelayedBlock, setIsDelayedBlock] = useState(false);

    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
    const isDisabled = isHidden || isFollowersOnlyAndNotFollowing || isDelayedBlock;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!value || isDisabled) {
            return;
        }

        if (isDelayed && !isDelayedBlock) {
            setIsDelayedBlock(true);
            setTimeout(() => {
                setIsDelayedBlock(false);
                onSubmit();
            }, 3000);
        } else {
            onSubmit();
        }
    }

    if (isHidden) {
        return null;
    }



    return (
        <form
            className="flex flex-col items-center gap-y-2 p-3"
            onSubmit={handleSubmit}
        >
            <div className="w-full">
                <ChatInfo
                    isDelayed={isDelayed}
                    isFollowersOnly={isFollowersOnly}
                />
                <Input
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    disabled={isDisabled}
                    placeholder="Enter message"
                    className={cn(
                        "border-white/10 py-6",
                        isFollowersOnly && "rounded-t-none border-t-0"
                    )}
                />
            </div>
            <div className="w-full flex justify-end px-2">
                <Button
                    type="submit"
                    size="sm"
                    disabled={isDisabled}
                    className="hover:bg-white/10"
                >
                    Send
                </Button>
            </div>
        </form>
    );
};


export function ChatFormSkeleton() {
    return (
        <div className="flex flex-col items-center gap-y-4 p-3">
            <Skeleton className="h-8 w-full" />
            <div className="flex items-center gap-x-2 ml-auto">
                <Skeleton className="h-7 w-12" />
            </div>
        </div>
    );
}