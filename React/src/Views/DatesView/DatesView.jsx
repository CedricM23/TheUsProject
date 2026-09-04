import DatesService from '../../services/DatesService'
import DateCard from '../../components/DateCard/DateCard'
import { useState, useEffect } from 'react'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router'

export default function DatesView() {
    const [dates, setDates] = useState([])

    useEffect(() => {
        setDates(DatesService.getDates())
    }, [])

    return (
        <div className="mx-10 mt-5">
            {/* Header Row: Flexbox aligns the title left and icon right */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Dates</h1>

                {/* Wrapped the icon in a button for better accessibility and hover states */}
                {/* Replace your current button with this: */}
                <Link to="/dates/new">
                <button
                    aria-label="Edit Dates"
                    onClick={() => console.log("Button clicked!")} // Add your actual logic here
                    className="border border-gray-300 p-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-black transition-colors active:bg-gray-200"
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                </Link>
            </div>

            <p className="text-[#4b5563] italic mt-1 text-center">Number of Dates: {dates.length}</p>

            <div className="flex justify-center flex-wrap gap-5 mt-8">
                {dates.map((date) => (
                    <DateCard key={date.id} date={date} />
                ))}
            </div>
        </div>
    )
}