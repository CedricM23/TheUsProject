import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import WatchedService from "../../services/WatchedService"

export default function MarkAsWatched({ mediaId, type, runtime }) {
    const [isWatched, setIsWatched] = useState(false)

    const handleClick = () => {

        
        WatchedService.addToWatched(mediaId, type, runtime)
            .then(response => {
                alert("Successfully added to your watched!")
                setIsWatched(true)
            })
            .catch((error) => {
                alert("Item is already marked as watched or could not be added.");
                console.error("Failed to add to watched", error);
            });
    }

    return (
        <>
            <div className="dropdown dropdown-center dropdown-hover">
                <button
                    onClick={handleClick}
                    className="border-0 bg-transparent text-left cursor-pointer text-4xl flex items-center gap-2"
                >
                    {isWatched ? (
                        <FontAwesomeIcon icon={faCircleCheck} />
                    ) : (
                        <FontAwesomeIcon icon={faCirclePlus} />
                    )}
                </button>

                <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm mt-2 w-fit text-center">
                    <p>Mark as watched</p>
                </ul>
            </div>
        </>
    )
}