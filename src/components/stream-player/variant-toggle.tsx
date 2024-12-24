"use client";

import { ArrowLeftFromLine, ArrowRightFromLine, MessageSquare, Users } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button"
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useChat } from "@livekit/components-react";

export function VariantToggle() {
    const {
        variant,
        onChangeVariant
    } = useChatSidebar((state) => state);

    const isChat = variant === ChatVariant.CHAT;;

    let Icon = isChat ? Users : MessageSquare;

    const onToggle = () => {
        const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
        onChangeVariant(newVariant);
    };

    const label = isChat ? "Community" : "Go back to chat";

    return (
        <Hint
            label={label}
            side="left"
            asChild
        >
            <Button
                className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
                onClick={onToggle}
                variant="ghost"
            >
                <Icon className="h-6 w-6" />
            </Button>
        </Hint>
    );
}