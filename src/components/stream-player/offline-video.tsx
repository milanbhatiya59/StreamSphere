import { WifiOff } from "lucide-react";

interface OfflineVideoProps {
    username: string
}

export function OfflineVideo({ username }: OfflineVideoProps) {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <WifiOff className="text-muted-foreground h-10 w-10" />
            <p className="text-muted-foreground">
                {username} is offline
            </p>
        </div>
    );
}