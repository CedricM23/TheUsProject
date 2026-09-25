import { useRef } from "react";
import placeholder from '../../images/placeholder.png'

export default function CastandCrewCarousel({ people }) {
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
        <div className="w-full mt-5">
            <div className="flex justify-between items-center mb-4 px-4">
                <h1 className="text-3xl font-bold">Cast & Crew</h1>

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
                {people.map((person) => (
                    <div key={person.id} className="w-30 carousel-item flex-col items-center">
                        {person.profile_path ?
                            <img
                                src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                                alt={person.name}
                                className="w-30 h-30 rounded-full object-cover bg-zinc-800 shadow-md mb-2"
                                loading="lazy"
                            /> :
                            <img 
                            className="w-30 h-30 rounded-full object-cover bg-zinc-800 shadow-md mb-2" 
                            src={placeholder} 
                            alt="lazy" />
                        }
                        <h1 className="text-sm text-center font-semibold leading-tight">
                            {person.name}
                        </h1>
                        <h3 className="text-xs text-center font-semibold leading-tight text-gray-500">
                            {person.character}
                        </h3>
                    </div>
                ))}
            </div>

        </div>
    );
}