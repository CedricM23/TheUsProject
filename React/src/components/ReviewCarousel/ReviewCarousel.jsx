import { useRef } from "react";
import placeholder from '../../images/placeholder.png'

export default function ReviewCarousel({ reviews }) {
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
            <div className="flex justify-between items-center mb-4 p-4">
                <h1 className="text-3xl font-bold">Reviews</h1>

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
                {reviews?.map((review) => (
                    // 1. Key goes only on the outermost wrapper
                    // 2. Fixed w-250 to w-[250px]
                    <div key={review.id} className="w-[85vw] md:w-[400px] lg:w-[500px] max-h-fit carousel-item border-2 border-zinc-800 rounded-xl p-4 flex flex-col">
                        <div className="flex flex-row items-center gap-3 mb-2">

                            {review.author_details?.avatar_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`}
                                    alt={review.author}
                                    className="w-10 h-10 rounded-full object-cover bg-zinc-800 shadow-md shrink-0"
                                    loading="lazy"
                                />
                            ) : (
                                <img
                                    src={placeholder}
                                    alt="Default avatar"
                                    className="w-10 h-10 rounded-full object-cover bg-zinc-800 shadow-md shrink-0"
                                />
                            )}

                            {/* Added truncate so long usernames don't break the 250px box */}
                            <h1 className="font-bold text-white truncate">{review.author}</h1>

                            {review.author_details.rating ?
                                <h3 className="text-xs font-bold text-white bg-black px-2 py-1 rounded-full w-fit">
                                    {(review.author_details.rating / 10) * 100}%
                                </h3> :
                                <h3 className="text-xs font-bold text-zinc-500 bg-zinc-800/50 border border-zinc-700 px-2 py-1 rounded-full w-fit">
                                    No Rating
                                </h3>
                            }
                        </div>

                        {/* BODY */}
                        <p className="line-clamp-6 text-sm text-zinc-300 leading-relaxed">
                            {review.content}
                        </p>

                        <div className="mt-auto pt-4">
                            <button
                                className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                                popoverTarget={review.id}
                            >
                                Read Full Review &rarr;
                            </button>

                            {/* Modal Content */}
                            <div className="modal" id={review.id} popover="auto">
                                <div className="modal-box">
                                    {/* Title Section */}

                                    <div className="flex flex-row items-center gap-3 mb-2">

                                        {review.author_details?.avatar_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`}
                                                alt={review.author}
                                                className="w-10 h-10 rounded-full object-cover bg-zinc-800 shadow-md shrink-0"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <img
                                                src={placeholder}
                                                alt="Default avatar"
                                                className="w-10 h-10 rounded-full object-cover bg-zinc-800 shadow-md shrink-0"
                                            />
                                        )}

                                        {/* Added truncate so long usernames don't break the 250px box */}
                                        <h1 className="font-bold text-white truncate">{review.author}</h1>

                                        {review.author_details.rating ?
                                            <h3 className="text-xs font-bold text-white bg-black px-2 py-1 rounded-full w-fit">
                                                {(review.author_details.rating / 10) * 100}%
                                            </h3> :
                                            <h3 className="text-xs font-bold text-zinc-500 bg-zinc-800/50 border border-zinc-700 px-2 py-1 rounded-full w-fit">
                                                No Rating
                                            </h3>
                                        }
                                    </div>

                                    <button
                                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl m-5"
                                        popoverTarget={review.id}
                                        popoverTargetAction="hide"
                                    >
                                        ✕
                                    </button>

                                    <p className="py-4">{review.content}</p>
                                </div>


                                <div className="modal-backdrop">
                                    <button popoverTarget={review.id} popoverTargetAction="hide">close</button>
                                </div>




                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div >
    );
}