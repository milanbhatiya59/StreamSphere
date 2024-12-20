import { Logo } from "@/app/(dashboard)/dashboard/[username]/_components/navbar/logo";
import { Action } from "@/app/(dashboard)/dashboard/[username]/_components/navbar/actions";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-24 z-[49] bg-black px-2 md:px-4 flex justify-between items-center shadow-md shadow-stone-800 transition">
      <div className="lg:block hidden">
        <Logo width={63} height={63} desc={true} name={true} />
      </div>
      <div className="lg:hidden block">
        <Logo width={68} height={68} desc={false} name={false} />
      </div>
      <Action />
    </nav>
  );
}
