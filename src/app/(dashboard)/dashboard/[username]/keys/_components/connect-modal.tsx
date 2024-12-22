"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Alert,
    AlertDescription,
    AlertTitle
} from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import {
    IngressInput
} from "livekit-server-sdk"

import { useState, useTransition, useRef } from "react";

import { createIngress } from "@/actions/ingress"
import { toast } from "sonner";


const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export function ConnectModal() {

    const [ingressType, setIngressType] = useState<IngressType>(RTMP);
    const [isPending, startTransition] = useTransition();
    const closeRef = useRef<HTMLButtonElement>(null);

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => {
                    toast.success("Ingress Created")
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Something went wrong"));
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="text-sm font-semibold bg-white/10">
                    Generate
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Generate Connection
                    </DialogTitle>
                    <DialogClose />
                </DialogHeader>
                <Select
                    value={ingressType}
                    disabled={isPending}
                    onValueChange={(value) => setIngressType(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}>RTMP</SelectItem>
                        <SelectItem value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="h-6 w-6" />
                    <AlertTitle >Warning</AlertTitle>
                    <AlertDescription>
                        This action will reset all active streams using the current connection
                    </AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose
                        asChild
                        ref={closeRef}
                    >
                        <Button variant="ghost">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={onSubmit}
                        disabled={isPending}
                        className="bg-white/10"
                    >
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};