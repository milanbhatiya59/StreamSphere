import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";

interface ChatListProps {
    messages: ReceivedChatMessage[];
    isHidden: boolean;
}


export function ChatList({
    messages,
    isHidden,
}: ChatListProps) {

    if (isHidden || !messages || messages.length === 0) {
        <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground font-semibold">
                {isHidden ? "Chat is disabled" : "Welcome to the chat"}
            </p>
        </div>
    }

    return (
        <div className="flex flex-1 flex-col-reverse overflow-y-auto px-3 h-full">
            {messages.map((messages) => (
                <ChatMessage
                    key={messages.timestamp}
                    data={messages}
                />
            ))}
        </div>
    );
}