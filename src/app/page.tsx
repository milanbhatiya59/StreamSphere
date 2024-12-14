import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div className="text-white">only auth user can see this</div>
    </>
  );
}
