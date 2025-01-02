import { getSearch } from "@/lib/search-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsProps {
    search_query?: string;
}

export async function Results({
    search_query
}: ResultsProps) {

    const data = await getSearch(search_query);

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Results for &quot;{search_query}&quot;
            </h2>
            {data.length === 0 && (
                <p className="text-muted-foreground text-sm">
                    No results found. Try searching for something else.
                </p>
            )}
            <div className="flex flex-col gap-y-4">
                {data.map((result) => (
                    <ResultCard
                        data={result}
                        key={result.id}
                    />
                ))}
            </div>
        </div>
    );
};

export function ResultsSkeleton() {
    return (
        <div>
            <Skeleton className="h-8 w-[290px] mb-4" />
            <div className="flex flex-col gap-y-4">
                {[...Array(5)].map((_, i) => (
                    <ResultCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}