import { useRef } from "react";
import DateCard from "../DateCard/DateCard";

export default function DateCarousel({ dates }) {
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

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4 px-4">
                <h1 className="text-3xl font-bold">Dates</h1>

                <div className="flex gap-2 hidden md:block">
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
                {dates.map((date) => (
                    <div key={date.id} className="carousel-item">
                        <DateCard date={date} className="w-[200px]" />
                    </div>
                ))}
            </div>
        </div>
    );
}