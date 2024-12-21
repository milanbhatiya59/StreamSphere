"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
    value: string
}

export function CopyButton({
    value
}: CopyButtonProps) {

    const [isCopied, setIsCopied] = useState(false);

    const onCopy = () => {
        if (!value) {
            return;
        }

        setIsCopied(true);
        navigator.clipboard.writeText(value);

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    const Icon = isCopied ? CheckCheck : Copy;

    return (
        <Button
            onClick={onCopy}
            disabled={!value || isCopied}
            variant="ghost"
            size="sm"
        >
            <Icon className="h-6 w-6" />
        </Button>
    );
}