"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { Menu } from "lucide-react";

export function Toggle() {

    const { collapsed, onCollapse, onExpand } = useCreatorSidebar((state) => state);

    const label = collapsed ? "Expand" : "Collapse"

    return (
        <>
            {collapsed && (
                <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
                    <Hint label={label} side="right" asChild >
                        <Button
                            className="h-auto p-2 stroke-2"
                            onClick={onExpand}
                            variant="ghost"
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </Hint>
                </div>
            )}
            {
                !collapsed && (
                    <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full">
                        <p className="font-semibold">Dashboard</p>
                        <Hint label={label} side="right" asChild>
                            <Button
                                className="h-auto p-2 ml-auto stroke-2"
                                onClick={onCollapse}
                                variant="ghost"
                            >
                                <Menu className="h-6 w-6 " />
                            </Button>
                        </Hint>
                    </div>
                )
            }
        </>
    );
}