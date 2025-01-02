import { redirect } from "next/navigation";
import { Results, ResultsSkeleton } from "./_components/results";
import { Suspense } from "react";

interface SearchPageProps {
    searchParams: Promise<{
        search_query?: string;
    }>;
}

export default async function SearchPage({
    searchParams
}: SearchPageProps) {

    const { search_query } = await searchParams;

    if (!search_query) {
        redirect('/');
    }

    return (
        <div className="h-full p-8 max-w-screen-2xl mx-auto">
            <Suspense fallback={<ResultsSkeleton />}>
                <Results
                    search_query={search_query}
                />
            </Suspense>
        </div>
    )
}