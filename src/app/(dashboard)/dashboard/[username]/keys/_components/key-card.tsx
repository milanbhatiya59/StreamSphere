"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CopyButton } from "./copy-button";


interface KeyCardProps {
    value: string | null;
}

export function KeyCard({
    value
}: KeyCardProps) {

    const [show, setShow] = useState(false);

    const handleShow = () => {
        if (!value) {
            setShow(false);
            return;
        }
        setShow(!show);

    }

    return (
        <div className="rounded-xl bg-white/10 p-6">
            <div className="flex items-start gap-x-10">
                <p className="font-semibold pt-2 shrink-0">
                    Stream Key
                </p>
                <div className="space-y-2 w-full">
                    <div className="w-full flex items-center gap-x-2">
                        <Input
                            value={value || ""}
                            disabled
                            type={show ? "text" : "password"}
                            placeholder="Stream Key"
                        />
                        <CopyButton
                            value={value || ""}
                        />
                    </div>
                    <Button
                        size="sm"
                        variant="link"
                        className="text-white"
                        onClick={handleShow}
                    >
                        {show ? "Hide" : "Show"}
                    </Button>
                </div>
            </div>
        </div>
    );
}