import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { House } from "lucide-react";

export function Action() {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button
        size="sm"
        variant="ghost"
        className="text-muted-foreground hover:text-primary m-2"
      >
        <Link href="/" className="flex items-center">
          <House className="h-5 w-5 mr-2" />
          Home
        </Link>
      </Button>
      <UserButton />
    </div>
  );
}
