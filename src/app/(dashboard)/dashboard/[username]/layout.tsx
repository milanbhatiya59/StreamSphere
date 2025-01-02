import { redirect } from "next/navigation";

import { getSelfByUsername } from "@/lib/auth-service";


import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreatorLayoutProps {
    params: Promise<{ username: string }>;
    children: React.ReactNode;
}

export default async function CreatorLayout({
    params,
    children,
}: CreatorLayoutProps) {

    const { username } = await params;

    if (!username) {
        redirect("/");
    }

    const self = await getSelfByUsername(username);

    if (!self) {
        redirect("/");
    }

    return (
        <>
            <Navbar />
            <div className="flex h-full pt-24">
                <Sidebar />
                <Container>
                    {children}
                </ Container>
            </div>
        </>
    )
}