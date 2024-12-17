import { Logo } from "../../components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-5">
      <Logo width={80} height={80} desc={true} name={true} />
      {children}
    </div>
  );
}
