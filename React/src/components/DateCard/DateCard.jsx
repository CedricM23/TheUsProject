import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'

export default function DateCard({ date }) {
    return (
        <article className="w-64 mb-2.5 rounded-2xl md:w-[450px] md:rounded-none">
            <Link to={`/dates/${date.id}`} className="no-underline block">
                <img
                    src={date.imageOfPlace}
                    alt={date.name}
                    /* Reduced md height to 275px, added w-full and object-cover to prevent stretching */
                    className="w-full object-cover rounded-2xl md:h-[275px] max-md:rounded-2xl"
                />
                {/* Changed text-base to text-sm, added margin-top, removed conflicting 'text-right' */}
                <h3 className="text-center text-sm mt-2 text-[#C11C84]">
                    {date.name}
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 text-xs"
                    />
                </h3>
            </Link>
        </article>
    )
}