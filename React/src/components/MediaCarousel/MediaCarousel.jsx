import { useEffect, useRef, useState } from "react";
import MediaCard from "../MediaCard/MediaCard";
import ListService from "../../services/ListService";
import ShowService from "../../services/ShowService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ComingSoonModal from "../../components/ComingSoonModal/ComingSoonModal";

export default function MediaCarousel({ media, title, type }) {
    const [listItems, setListItems] = useState([])

    const carouselRef = useRef(null);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 320;
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if (type === "list") {
            ListService.getListItems(media.listId)
                .then(response => {
                    const listRecords = response.data;
                    const tmdbPromises = listRecords.map(record => {
                        return ShowService.getDetails(record.mediaType, record.tmdbMediaId)
                            .then(tmdbResponse => {
                                return {
                                    ...tmdbResponse.data,
                                    media_type: record.mediaType
                                };
                            });
                    })
                    return Promise.all(tmdbPromises);
                })
                .then(fullListData => {
                    setListItems(fullListData);
                })
                .catch(error => {
                    console.error("Error loading list items:", error);
                });
        }
    }, [type]);

    function handleListDelete() {

        if (!window.confirm("Are you sure you want to delete this entire list?")) {
            return;
        }

        ListService.deleteList(media.listId)
            .then((response) => {
                alert("List deleted successfully!");

                window.location.reload();
            })
            .catch((error) => {
                console.error("Failed to delete list", error);
                alert("Could not delete the list.");
            });
    }


    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4 px-4">
                <div>
                    <h1 className="text-3xl font-bold max-md:text-center">{title}</h1>
                    <div className="md:hidden flex justify-center mt-2">
                        {media.listId ? (
                            <button
                                className="border-0 bg-transparent text-2xl cursor-pointer hover:text-red-500 transition-colors"
                                onClick={handleListDelete}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        ) : null}
                    </div>
                </div>



                <div className="hidden md:flex items-center gap-3">
                    {media.listId ? (
                        <button
                            className="border-0 bg-transparent text-2xl cursor-pointer hover:text-red-500 transition-colors" onClick={handleListDelete}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    ) : null}

                    <button
                        onClick={() => scroll('left')}
                        className="btn btn-circle btn-sm bg-base-200 border-none"
                    >
                        ❮
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="btn btn-circle btn-sm bg-base-200 border-none"
                    >
                        ❯
                    </button>
                </div>
            </div>

            <div
                ref={carouselRef}
                className="carousel carousel-center rounded-box max-w-full space-x-4 p-4"
            >

                {type === "list" ? (
                    listItems?.map((item) => (
                        <div key={item.id} className="carousel-item">
                            <MediaCard movie={item} mediaType={type} listId={media.listId || media.id} />
                        </div>
                    ))
                ) : (
                    media?.map((item, index) => (
                        <div key={index} className="carousel-item">
                            <MediaCard movie={item} mediaType={type} />
                        </div>
                    ))
                )}

            </div>
        </div>
    );
}