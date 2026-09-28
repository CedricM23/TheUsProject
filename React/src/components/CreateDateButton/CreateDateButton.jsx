import { Link } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"

export default function CreateDateButton() {
    return (
        <Link to="/dates/new">
            <button
                aria-label="Edit Dates"
                className="border border-gray-300 p-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-black transition-colors active:bg-gray-200"
            >
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
        </Link>
    )
}