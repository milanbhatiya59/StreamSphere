import { Logo } from "@/components/logo";
import { Search } from "@/app/(browse)/_components/navbar/search";
import { Action } from "@/app/(browse)/_components/navbar/actions";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-24 z-[49] bg-black px-2 md:px-4 flex justify-between items-center shadow-md shadow-stone-800 transition">
      <div className="md:block hidden">
        <Logo width={63} height={63} desc={false} name={true} />
      </div>
      <div className="md:hidden block">
        <Logo width={68} height={68} desc={false} name={false} />
      </div>
      <Search />
      <Action />
    </nav>
  );
}
