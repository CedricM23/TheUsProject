import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as Unliked } from "@fortawesome/free-regular-svg-icons";
import { faList, faHeart as Liked, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import FavoriteService from "../../services/FavoriteService";
import ListService from "../../services/ListService";
import MarkAsWatched from '../../components/MarkAsWatched/MarkAsWatched'

export default function MediaCard({ movie, mediaType, listId }) {
    const [newListName, setNewListName] = useState("");
    const [heart, setHeart] = useState(Unliked);
    const [lists, SetLists] = useState([]);
    const modalRef = useRef(null);

    useEffect(() => {
        ListService.getMyLists().then(response => SetLists(response.data));

        FavoriteService.checkFavorite(movie.id, movie.media_type || mediaType)
            .then((response) => {
                if (response.data === true) {
                    setHeart(Liked);
                } else {
                    setHeart(Unliked);
                }
            })
            .catch((error) => {
                console.error("Could not verify favorite status", error);
            });
    }, [movie.id, mediaType]);

    function handleAddToList(targetListId) {
        const type = movie.media_type || mediaType;

        if (!movie.id || !type) {
            console.error("Missing movie ID or media type");
            return;
        }

        ListService.addItemToList(targetListId, movie.id, type)
            .then(() => {
                alert("Successfully added to your list!");
                document.activeElement.blur();
            })
            .catch((error) => {
                alert("Item is already in this list or could not be added.");
                console.error("Failed to add to list", error);
            });
    }

    function handleRemoveFromList(e) {
        e.preventDefault();
        const type = movie.media_type || mediaType;

        if (!listId || !movie.id || !type) {
            console.error("Missing required data to remove item.");
            return;
        }

        ListService.removeItemFromList(listId, movie.id, type)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error("Failed to remove item", error);
            });
    }

    function handleCreateList(e) {
        e.preventDefault();

        if (!newListName.trim()) return;

        ListService.createList(newListName)
            .then((response) => {
                SetLists([...lists, response.data]);
                setNewListName("");

                if (modalRef.current) {
                    modalRef.current.hidePopover();
                }

                alert("List created successfully!");
            })
            .catch((error) => {
                console.error("Failed to create list", error);
                alert("Could not create the list.");
            });
    }

    function handleClick(e) {
        e.preventDefault();

        if (heart === Unliked) {
            FavoriteService.addFavorite(movie.id, movie.media_type || mediaType).then(
                () => setHeart(Liked)
            ).catch(() => alert("Item was not added to your favorites"));
        } else if (heart === Liked) {
            FavoriteService.removeFavorite(movie.id, movie.media_type || mediaType).then(
                () => setHeart(Unliked)
            ).catch(() => alert("Item was not removed from your favorites"));
        }
    }

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
                    <h1 className="text-center font-bold line-clamp-2 w-full min-h-[3rem]">
                        {movie.title || movie.name}
                    </h1>

                    <div className="flex flex-col items-center w-full mt-auto align-middle">
                        {/* Centered percentage score text */}
                        <p className="mt-2 text-center w-full font-semibold">
                            {Math.round(movie.vote_average / 10 * 100)}%
                        </p>


                        <div className="flex flex-row items-center justify-center gap-4 mt-2 w-full pointer-events-auto">

                            {/* Heart Button */}
                            <button
                                className="border-0 bg-transparent text-2xl cursor-pointer hover:text-red-500 transition-colors flex items-center justify-center"
                                onClick={handleClick}
                                aria-label="Toggle Favorite"
                            >
                                <FontAwesomeIcon icon={heart} />
                            </button>

                            {/* List Dropdown */}
                            <div className="dropdown dropdown-top dropdown-center z-10 flex items-center justify-center" onClick={(e) => e.preventDefault()}>
                                {/* Removed .btn styles and matched the text size/flex */}
                                <div tabIndex={0} role="button" className="text-2xl cursor-pointer m-0 flex items-center justify-center hover:text-blue-500 transition-colors">
                                    <FontAwesomeIcon icon={faList} />
                                </div>
                                <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    {lists.map((list) => (
                                        <li key={list.listId}>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleAddToList(list.listId);
                                                }}
                                            >
                                                {list.listName}
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            className="text-blue-600"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (modalRef.current) modalRef.current.showPopover();
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                            Create a new List!
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* END MODAL CODE (Keep your modal code here exactly as it is) */}
                            {/* ... */}


                            {/* Trash Button */}
                            {listId ? (
                                <button
                                    className="border-0 bg-transparent text-2xl cursor-pointer hover:text-red-500 transition-colors flex items-center justify-center"
                                    onClick={handleRemoveFromList}
                                    aria-label="Remove from list"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}