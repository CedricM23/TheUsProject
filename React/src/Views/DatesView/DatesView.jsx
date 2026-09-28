import DatesService from '../../services/DatesService'
import DateCard from '../../components/DateCard/DateCard'
import { useState, useEffect } from 'react'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router'
import CreateDateButton from '../../components/CreateDateButton/CreateDateButton'

export default function DatesView() {
    const [dates, setDates] = useState([])

    useEffect(() => {
       DatesService.getAllDateEvents().then(response => setDates(response.data))
    }, [])

    return (
        <div className="mx-10 mt-5">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Dates</h1>
                <CreateDateButton />
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