import { Loader } from "lucide-react";

interface LoadingVideoProps {
    label: string
}

export function LoadingVideo({ label }: LoadingVideoProps) {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Loader className="text-muted-foreground h-10 w-10 animate-spin" />
            <p className="text-muted-foreground capitalize">
                {label}
            </p>
        </div>
    );
}