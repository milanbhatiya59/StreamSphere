import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Clapperboard } from "lucide-react";

export async function Action() {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 md:ml-0">
      {!user && (
        <SignInButton>
          <Button size="sm" variant="outline">
            Login
          </Button>
        </SignInButton>
      )}
      {user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground"
            asChild
          >
            <Link href={`/user/${user.username}`}>
              <Clapperboard className="h-5 w-5 md:mr-2" />
              <span className="hidden md:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
}
