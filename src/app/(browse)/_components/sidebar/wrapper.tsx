"use client";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { useIsClient } from "usehooks-ts";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {

  const isClient = useIsClient();
  const { collapsed } = useSidebar((state) => state);

  if (!isClient) {
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r-2 border-t-2 border-stone-800 z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r-2 border-t-2 border-stone-800 z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
}
