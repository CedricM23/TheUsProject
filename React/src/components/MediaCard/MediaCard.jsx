import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as Unliked } from "@fortawesome/free-regular-svg-icons";
import { faList, faHeart as Liked, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import FavoriteService from "../../services/FavoriteService";
import ListService from "../../services/ListService";

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

                    <div className="flex flex-col items-center w-full mt-auto">
                        <p className="mt-2">{Math.round(movie.vote_average / 10 * 100)}%</p>

                        <div className="flex gap-5 mt-2 pointer-events-auto">
                            <button
                                className="border-0 bg-transparent text-2xl w-full cursor-pointer hover:text-red-500 transition-colors"
                                onClick={handleClick}
                            >
                                <FontAwesomeIcon icon={heart} />
                            </button>

                            <div className="dropdown dropdown-top dropdown-center z-10" onClick={(e) => e.preventDefault()}>
                                <div tabIndex={0} role="button" className="btn m-1">
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

                            {/* MODAL MOVED OUTSIDE THE DROPDOWN */}
                            <div className="modal" id={`modal-${movie.id}`} ref={modalRef} popover="auto">
                                <div className="modal-box bg-base-100 shadow-xl overflow-hidden relative z-50" onClick={(e) => e.stopPropagation()}>
                                    <h3 className="font-bold text-lg mb-4">Create a New List</h3>
                                    <form onSubmit={handleCreateList}>
                                        <input
                                            type="text"
                                            placeholder="E.g., Halloween Marathon 🎃"
                                            className="input input-bordered w-full mb-6"
                                            value={newListName}
                                            onChange={(e) => setNewListName(e.target.value)}
                                            required
                                        />
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setNewListName("");
                                                    if (modalRef.current) modalRef.current.hidePopover();
                                                }}
                                            >
                                                Cancel
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                Create
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="modal-backdrop fixed inset-0 bg-black/85 z-40">
                                    <button
                                        type="button"
                                        className="w-full h-full cursor-default text-transparent border-none bg-transparent"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (modalRef.current) modalRef.current.hidePopover();
                                        }}
                                    >
                                        close
                                    </button>
                                </div>
                            </div>
                            {/* END MODAL */}

                            {listId ? (
                                <button
                                    className="border-0 bg-transparent text-2xl w-full cursor-pointer hover:text-red-500 transition-colors"
                                    onClick={handleRemoveFromList}
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