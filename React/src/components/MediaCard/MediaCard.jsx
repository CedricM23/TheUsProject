import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as Unliked } from "@fortawesome/free-regular-svg-icons";
import { faList, faHeart as Liked } from "@fortawesome/free-solid-svg-icons"; // Combined imports
import { useState, useEffect } from "react";
import { Link } from "react-router";
import ShowService from "../../services/ShowService";

export default function MediaCard({ movie, mediaType }) {
    const [heart, setHeart] = useState(Unliked);
    const [lists, SetLists] = useState([]);

    useEffect(() => {
        ShowService.getlists().then(
            (response) => (
                SetLists(response.data.results)
            )
        )
    }, []);

    function handleClick(e) {
        e.preventDefault();
        if (heart === Unliked) {
            setHeart(Liked);
        } else if (heart === Liked) {
            setHeart(Unliked);
        }
    }

    return (
        <div className="relative block h-full w-[240px] bg-blue-500/10 rounded-2xl hover:scale-105 transition-transform">
            <Link
                to={`/${movie.id}/${mediaType}`}
                className="absolute inset-0 z-0 rounded-2xl"
                aria-label={`View details for ${mediaType === "movie" ? movie.title : movie.name}`}
            />

            <div className="p-5 flex flex-col items-center h-full relative z-10 pointer-events-none">
                <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    className="w-[200px] aspect-[2/3] object-cover rounded-md"
                    alt={movie.title}
                />

                <div className="flex flex-col flex-grow items-center justify-between w-full mt-3">
                    <h1 className="text-center font-bold line-clamp-2 w-full">
                        {mediaType === "movie" ? movie.title : movie.name}
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