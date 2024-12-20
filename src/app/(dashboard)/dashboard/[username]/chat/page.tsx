import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { ToggleCard } from "./_components/toggle-card";


export default async function ChatPage() {

    const self = await getSelf();
    const stream = await getStreamByUserId(self.id);

    if (!stream) {
        throw new Error("Stream not found");
    }

    return (
        <div className="p-6 ">
            <div className="mb-4">
                <h1 className="text-2xl font-bol">
                    Chat Settings
                </h1>
            </div>

            <div className="space-y-4">
                <ToggleCard
                    field="isChatEnabled"
                    label="Enable Chat"
                    value={stream.isChatEnabled}
                />
                <ToggleCard
                    field="isChatFollowersOnly"
                    label="Only Follwers Chat"
                    value={stream.isChatFollowersOnly}
                />
                <ToggleCard
                    field="isChatDelayed"
                    label="Delay Chat"
                    value={stream.isChatDelayed}
                />
            </div>
        </div>
    );
}