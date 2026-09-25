import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import ShowService from "../../services/ShowService";
import MediaCard from "../../components/MediaCard/MediaCard";
import DatesService from "../../services/DatesService";
import DateCard from "../../components/DateCard/DateCard";

export default function SearchResultsView() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");

    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        if (!query) return;

        setIsLoading(true);

        setIsLoading(true);

        Promise.all([
            ShowService.searchMulti(query),
            DatesService.getDateByName(query)
        ])
            .then(([showsResponse, datesResponse]) => {
                const shows = showsResponse.data.results || [];
                const dates = datesResponse.data || [];
                const combinedResults = [...shows, ...dates];
                setResults(combinedResults);
            })
            .catch(error => {
                console.error("Search failed:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });



    }, [query]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">
                Search Results for "{query}"
            </h2>

            {isLoading ? (
                <div className="flex justify-center mt-10">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : results.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <div className="flex flex-wrap gap-3 justify-center">
                    {results.map(item =>
                        item.media_type ? (
                            <MediaCard key={item.id} movie={item}/>
                        ) : (
                            <DateCard date={item} className="w-[200px]" />
                        )
                    )}
                </div>
            )}
        </div>
    );
}