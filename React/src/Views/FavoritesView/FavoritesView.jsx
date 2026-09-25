import { useState, useEffect } from "react";
import FavoriteService from "../../services/FavoriteService";
import ShowService from "../../services/ShowService";
import MediaCard from "../../components/MediaCard/MediaCard";

export default function FavoritesView() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        FavoriteService.getMyFavorites()
            .then(response => {
                const favoriteRecords = response.data; 
                const tmdbPromises = favoriteRecords.map(record => {
                    return ShowService.getDetails(record.mediaType, record.tmdbMediaId)
                        .then(tmdbResponse => {
                            return { 
                                ...tmdbResponse.data, 
                                media_type: record.mediaType 
                            };
                        });
                });

                return Promise.all(tmdbPromises);
            })
            .then(fullMediaData => {
                setFavorites(fullMediaData);
            })
            .catch(error => {
                console.error("Error loading favorites:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
            
            {isLoading ? (
                <div className="flex justify-center mt-10">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : favorites.length === 0 ? (
                <p>You haven't favorited anything yet!</p>
            ) : (
                <div className="flex flex-wrap gap-4 justify-center">
                    {favorites.map(media => (
                        <MediaCard key={media.id} movie={media} />
                    ))}
                </div>
            )}
        </div>
    );
}