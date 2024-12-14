import Image from "next/image";
import "@/styles/fonts.css";

export function Logo() {
  return (
    <div className="flex items-center gap-y-4 gap-x-4">
      <div className="bg-white rounded-3xl p-1">
        <Image src="/appLogo.svg" width="80" height="80" alt="StreamSphere" />
      </div>
      <div className="flex flex-col items-center font-poppins ">
        <p className="text-xl font-semibold">Stream Sphere</p>
        <p className="text-sm text-muted-foreground font-medium">Stream Now!</p>
      </div>
    </div>
  );
}
