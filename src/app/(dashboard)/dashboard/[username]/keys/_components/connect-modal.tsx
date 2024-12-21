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

export function ConnectModal() {
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
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="RTMP">RTMP</SelectItem>
                        <SelectItem value="WHIP">WHIP</SelectItem>
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
                    <DialogClose asChild>
                        <Button variant={"ghost"}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={() => { }}
                        className="bg-white/10"
                    >
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};