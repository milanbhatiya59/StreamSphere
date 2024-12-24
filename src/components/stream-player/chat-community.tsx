"use client";

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
    viewerName: string;
    hostName: string;
    isHidden: boolean;
}

export function ChatCommunity({
    viewerName,
    hostName,
    isHidden
}: ChatCommunityProps) {

    const [value, setValue] = useState("");
    const debouncedValue = useDebounce<string>(value, 1000);

    const participants = useParticipants();

    const onChange = (newValue: string) => {
        setValue(newValue);
    }

    const filteredParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant);
            }
            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[])


        return deduped.filter((participant) => {
            return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase());
        })
    }, [participants, debouncedValue])

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground font-semibold">
                    Community is disabled
                </p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                placeholder="Search community"
                className="border-white/10"
            />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-muted-foreground text-sm hidden last:block p-2 font-semibold">
                    No results
                </p>
                {filteredParticipants.map((participant) => (
                    <CommunityItem
                        key={participant.identity}
                        viewerName={viewerName}
                        hostName={hostName}
                        participantName={participant.name}
                        participantIdentity={participant.identity}

                    />
                ))}
            </ScrollArea>
        </div>
    );
}