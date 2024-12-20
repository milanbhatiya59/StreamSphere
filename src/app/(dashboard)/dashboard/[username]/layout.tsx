import { redirect } from "next/navigation";

import { getSelfByUsername } from "@/lib/auth-service";


import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreatorLayoutProps {
    params: { username: string };
    children: React.ReactNode;
}

export default async function CreatorLayout({
    params,
    children,
}: CreatorLayoutProps) {

    const { username } = await params;

    // const self = await getSelfByUsername(username);

    const self = {
        id: '9c6a6df5-1f92-4b53-a2da-353ad941d073',
        username: 'milan1',
        imageUrl: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycUx6Qkl6V1hTUk4yellPamEyTnk3V09rUE8ifQ',
        externalUserId: 'user_2qLzBNlJagLULefdMrNQzmztCmX',
        bio: null,
        createdAt: '2024 - 12 - 17T17: 28: 30.111Z',
        updatedAt: '2024 - 12 - 18T11: 15:07.241Z'
    };

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