import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as Unliked } from "@fortawesome/free-regular-svg-icons";
import { faList, faHeart as Liked } from "@fortawesome/free-solid-svg-icons"; 
import { useState, useEffect } from "react";
import { Link } from "react-router";
import ShowService from "../../services/ShowService";
import FavoriteService from "../../services/FavoriteService";

export default function MediaCard({ movie, mediaType }) {
    const [heart, setHeart] = useState(Unliked);
    const [lists, SetLists] = useState([]);

    useEffect(() => {
        ShowService.getlists().then(
            (response) => (
                SetLists(response.data.results)
            )
        )
            FavoriteService.checkFavorite(movie.id, movie.media_type || mediaType)
                .then((response) => {
                    if (response.data == true) {
                        setHeart(Liked);
                    } else {
                        setHeart(Unliked);
                    }
                })
                .catch((error) => {
                    console.error("Could not verify favorite status", error);
                });
    }, []);

    function handleClick(e) {
        if (heart === Unliked) {
            FavoriteService.addFavorite( movie.id, movie.media_type || mediaType ).then(
                (response) => {
                    setHeart(Liked);
                }
            ).catch((error) => { alert("item was not added to your favorites") })
        } else if (heart === Liked) {
           FavoriteService.removeFavorite(movie.id, movie.media_type || mediaType).then(
                (response) => {
                    setHeart(Unliked);
                }
            ).catch((error) => { alert("item was not removed from your favorites") })
        }
    }

    // Determine the best available image, or set to null if none exist
    const imageUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/original${movie.poster_path}` 
        : movie.backdrop_path 
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : null;

    return (
        <div className="relative block h-full w-[240px] bg-blue-500/10 rounded-2xl hover:scale-105 transition-transform">
            <Link
                to={`/${movie.id}/${movie.media_type || mediaType}`}
                className="absolute inset-0 z-0 rounded-2xl"
                aria-label={`View details for ${movie.title || movie.name}`}
            />

            <div className="p-5 flex flex-col items-center h-full relative z-10 pointer-events-none">
                
                {/* Conditionally render the image or a placeholder */}
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        className="w-[200px] aspect-[2/3] object-cover rounded-md bg-base-300"
                        alt={movie.title || movie.name}
                    />
                ) : (
                    <div className="w-[200px] aspect-[2/3] bg-base-300 rounded-md flex items-center justify-center text-center p-4">
                        <span className="text-sm opacity-60">No Image</span>
                    </div>
                )}

                <div className="flex flex-col flex-grow items-center justify-between w-full mt-3">
                    <h1 className="text-center font-bold line-clamp-2 w-full">
                        {movie.title || movie.name}
                    </h1>

                    <div className="flex flex-col items-center w-full mt-auto">
                        <p className="mt-2">{Math.round(movie.vote_average / 10 * 100)}%</p>

                        <div className="flex gap-5 mt-2 pointer-events-auto">
                            <button
                                className="border-0 bg-transparent text-2xl w-full cursor-pointer"
                                onClick={handleClick}
                            >
                                <FontAwesomeIcon icon={heart} />
                            </button>

                            <div className="dropdown dropdown-top dropdown-center z-10" onClick={(e) => e.preventDefault()}>
                                <div tabIndex={0} role="button" className="btn m-1">
                                    <FontAwesomeIcon icon={faList} />
                                </div>
                                <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    {lists.map((list, index) => (
                                        <li key={index}>
                                            <Link to={`/list/${list.id}`}>{list.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}