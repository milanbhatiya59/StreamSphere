import Image from "next/image";
import "@/styles/fonts.css";

export function Logo({
  width,
  height,
  desc,
  name,
}: {
  width: number;
  height: number;
  desc: boolean;
  name: boolean;
}) {
  return (
    <div className="flex items-center gap-y-4 gap-x-4 transition">
      <div className="bg-white rounded-3xl p-1">
        <Image
          src="/appLogo.svg"
          width={width}
          height={height}
          alt="StreamSphere"
        />
      </div>
      <div className="flex flex-col items-center font-poppins ">
        {name && <p className="md:text-xl font-semibold">Stream Sphere</p>}
        {desc && (
          <p className="md:text-sm text-muted-foreground font-medium">
            Stream Now!
          </p>
        )}
      </div>
    </div>
  );
}
