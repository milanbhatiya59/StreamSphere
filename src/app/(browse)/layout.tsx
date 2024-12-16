import { Navbar } from "@/app/(browse)/_components/navbar/index";
import { Sidebar } from "@/app/(browse)/_components/sidebar/index";
import { Container } from "@/app/(browse)/_components/container";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-24">
        <Sidebar />
        <Container>
          {children}
        </Container>
      </div>
    </>
  );
}
