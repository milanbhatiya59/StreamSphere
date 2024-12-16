"use client";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  const { collapsed } = useSidebar((state) => state);
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
