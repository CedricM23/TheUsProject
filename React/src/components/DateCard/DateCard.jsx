import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'

export default function DateCard({ date }) {
    return (
        <article className="w-[400px] mb-2.5 rounded-2xl md:w-[600px] md:rounded-none">
            <Link to={`/dates/${date.id}`} className="no-underline">
                <img
                    src={date.imageOfPlace}
                    alt={date.name}
                    className="rounded-2xl md:h-[400px] max-md:rounded-2xl"
                />
                <h3 className="text-center text-base text-[#C11C84] text-right">
                    {date.name}
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2.5 text-sm"
                    />
                </h3>
            </Link>
        </article>
    )
}