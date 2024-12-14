import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div>
        <UserButton />
      </div>
      <div>Private Routes</div>
    </>
  );
}
