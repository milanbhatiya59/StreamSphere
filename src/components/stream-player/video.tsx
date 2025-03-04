"use client";


import { ConnectionState, Track } from "livekit-client";
import {
    useConnectionState,
    useRemoteParticipant,
    useTracks,
} from "@livekit/components-react"
import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./live-video";
import { Skeleton } from "../ui/skeleton";


interface VideoProps {
    hostName: string;
    hostIdentity: string;
}

export function Video({
    hostName,
    hostIdentity
}: VideoProps) {

    const connetionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const track = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
    ]).filter((track) => track.participant.identity === hostIdentity);

    let content;

    if (!participant && connetionState === ConnectionState.Connected) {
        content = <OfflineVideo username={hostName} />
    } else if (!participant || track.length === 0) {
        content = <LoadingVideo label={connetionState} />
    } else {
        content = <LiveVideo participant={participant} />
    }


    return (
        <div className="aspect-video group relative">
            {content}
        </div>
    )
}


export function VideoSkeleton() {
    return (
        <div className="aspect-video border-x border-background">
            <Skeleton className="w-full h-full rounded-none" />
        </div>
    )
}