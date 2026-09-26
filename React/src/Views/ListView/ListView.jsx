import { useState, useEffect } from "react";
import FavoriteService from "../../services/FavoriteService";
import ShowService from "../../services/ShowService";
import MediaCard from "../../components/MediaCard/MediaCard";
import ListService from "../../services/ListService"
import MediaCarousel from "../../components/MediaCarousel/MediaCarousel"

export default function ListView() {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        ListService.getMyLists()
            .then((response) => {
                setLists(response.data)
            })
            .catch(error => {
                console.error("Error loading favorites:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

   return (
        <div className="w-full"> 
            <h1 className="text-3xl font-bold mb-6 text-center mt-6">Your Lists</h1>

            {isLoading ? (
                <div className="flex justify-center mt-10">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : lists.length === 0 ? (
                <p className="text-center">Start your list to plan your next adventure!</p>
            ) : (
                <div className="flex flex-col gap-8"> 
                    {lists.map(list => (
                        <MediaCarousel key={list.listId} title={list.listName} type="list" media={list} />
                    ))}
                </div>
            )}
        </div>
    );
}