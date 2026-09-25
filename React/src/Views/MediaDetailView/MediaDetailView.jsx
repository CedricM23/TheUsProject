import { useParams } from "react-router";
import ShowService from "../../services/ShowService";
import { useEffect, useState } from "react";
import MetaTag from "../../components/MetaTag/MetaTag";
import CastandCrewCarousel from "../../components/CastandCrewCarousel/CastandCrewCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as Unliked } from "@fortawesome/free-regular-svg-icons";
import { faList, faHeart as Liked } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as Unsaved } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as Saved } from "@fortawesome/free-solid-svg-icons";
import MediaCarousel from "../../components/MediaCarousel/MediaCarousel";
import { Link } from "react-router";
import ReviewCarousel from "../../components/ReviewCarousel/ReviewCarousel";
import FavoriteService from "../../services/FavoriteService";
import BookmarkService from "../../services/BookmarkService";

export default function MediaDetailview() {
    const { id, type } = useParams();
    const [media, setMedia] = useState({});
    const [images, SetImages] = useState([]);
    const [mediavideos, setMediaVideos] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [lists, setLists] = useState([])
    const [showTrailer, setShowTrailer] = useState(false);
    const [credits, setCredits] = useState([])
    let hours = Math.floor(media.runtime / 60)
    let time = `${hours}h ${hours % 60}m`
    const imagepath = 'https://image.tmdb.org/t/p/w500'
    const [heart, setHeart] = useState(Unliked);
    const [bookmark, setBookmark] = useState(Unsaved)
    const [lists, setLists] = useState([]);
    const [statusMessage, setStatusMessage] = useState([])
    const [similar, setSimilar] = useState([])
    const [providers, setProviders] = useState([])
    const [reviews, setReviews] = useState([])
    const fpayload = {
        media_type: type,
        media_id: id,
    }


   function handleClick(e) {
           if (heart === Unliked) {
               FavoriteService.addFavorite( id, type).then(
                   (repsonse) => {
                       setHeart(Liked);
                   }
               ).catch((error) => { alert("item was not added to your favorites") })
           } else if (heart === Liked) {
              FavoriteService.removeFavorite(id, type).then(
                   (repsonse) => {
                       setHeart(Unliked);
                   }
               ).catch((error) => { alert("item was not removed from your favorites") })
           }
       }

    function handleBookmark() {
        if (bookmark == Unsaved) {
            BookmarkService.addBookmark(id, type).then(
                (response) => {
                    setBookmark(Saved)
                }).catch((error) => { alert("item was not added to your Watchlist") })
        } else if (bookmark == Saved) {
            BookmarkService.removeBookmark(id, type).then(
                (response) => {
                    setBookmark(Unsaved)
                }).catch((error) => { alert("item was not removed from your Watchlist") })
        }
    }



    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        if (type == 'tv') {
            // GET SHOW DATA
            ShowService.getShowbyId(id)
                .then((response) => {
                    setMedia(response.data)
                    setLoading(false)
                }).catch((error) =>
                    console.log('Shows not found')
                )
            // GET Videos
            //TODO: MOVE INTO MEDIA GALLERY
            ShowService.getviedosbyshow(id)
                .then((response) => {
                    setMediaVideos(response.data.results)
                    setLoading(false)
                }).catch((error) =>
                    console.log('Videos not found')
                )
            ShowService.GetCreditsByShowId(id)
                .then((response) => {
                    setCredits(response.data.cast)
                }).catch((error) =>
                    console.log('Credits not found')
                )
            ShowService.GetSimilarShows(id)
                .then((response) => {
                    setSimilar(response.data.results)
                }).catch((error) =>
                    console.log('Similar movies not found')
                )
            ShowService.GetImagesByShowId(id)
                .then((response) => {
                    SetImages(response.data.backdrops)
                }).catch((error) =>
                    console.log('Images not found')
                )
        } else {
            ShowService.getMoviebyId(id)
                .then((response) => {
                    setMedia(response.data)
                    setLoading(false)

                }).catch((error) =>
                    console.log('Movies not found')
                )
            ShowService.GetImagesByMovieId(id)
                .then((response) => {
                    SetImages(response.data.backdrops)
                }).catch((error) =>
                    console.log('Images not found')
                )
            ShowService.getviedosbymovie(id)
                .then((response) => {
                    setMediaVideos(response.data.results)
                    setLoading(false)
                }).catch((error) =>
                    console.log('Videos not found')
                )
            ShowService.GetCreditsByMovieId(id)
                .then((response) => {
                    setCredits(response.data.cast)
                }).catch((error) =>
                    console.log('Credits not found')
                )
            ShowService.GetSimilarMovies(id)
                .then((response) => {
                    setSimilar(response.data.results)
                }).catch((error) =>
                    console.log('Similar movies not found')
                )

            ShowService.GetWatchProvidersByMovieId(id)
                .then((response) => {

                    const usData = response.data.results.US;

                    if (usData) {

                        const allProviders = [
                            ...(usData.flatrate || []),
                            ...(usData.ads || []),
                            ...(usData.free || []),
                            ...(usData.rent || []),
                            ...(usData.buy || [])
                        ];


                        const uniqueProviders = Array.from(
                            new Map(allProviders.map(item => [item.provider_id, item])).values()
                        );

                        setProviders(uniqueProviders);
                    } else {
                        // Handle cases where the movie isn't available in the US
                        setProviders([]);
                    }
                }).catch((error) =>
                    console.log('Providers not found', error)

                );

            //Reviews Call
            ShowService.GetReviewsByMovieId(id)
                .then((response) => {
                    setReviews(response.data.results)
                }).catch((error) =>
                    console.log('Reviews not found', error)
                )

        }

        //All Media
        ShowService.getlists()
            .then((response) => {
                setLists(response.data.results)
            })


        // if (media.id) {
        //     const title = media.name || media.title;
        //     const year = media.release_date?.substring(0, 4) || media.first_air_date?.substring(0, 4);

        //     // Double check that we have a valid title and year
        //     if (title && year) {
        //         ShowService.GetScoreByMediaNameandYear(title, year)
        //             .then((response) => {
        //                 if (response.data.Response === "True") {
        //                     setMediaScores(response.data.Ratings);
        //                 } else {
        //                     console.log("OMDb Error:", response.data.Error);
        //                 }
        //             }).catch((error) => console.log('Scores not found', error));
        //     }
        // }


        
        if (id && type) {
                    FavoriteService.checkFavorite(id, type)
                        .then((response) => {
                            if (response.data == true) {
                                setHeart(Liked);
                            } else {
                                setHeart(Unliked);
                            }
                        })
                        .catch((error) => {
                            console.error("Could not verify favorite status", error);
                        });


                    BookmarkService.checkBookmark(id, type)
                        .then((repsonse) => {
                            if(repsonse.data == true) {
                                setBookmark(Saved);
                            } else {
                                setBookmark(Unsaved)
                            }
                        })
                }



        // if (id && type) {
        //     ShowService.checkAccountStates(id, type)
        //         .then((response) => {
        //             if (response.data.favorite) {
        //                 setHeart(Liked);
        //             } else {
        //                 setHeart(Unliked);
        //             }

        //             if (response.data.watchlist) {
        //                 setBookmark(Saved);
        //             } else {
        //                 setBookmark(Unsaved);
        //             }

        //         })
        //         .catch((error) => {
        //             console.error("Could not verify favorite status", error);
        //         });
        // }
    }, [id, type])


    function handleListSelect(ListId, ListName) {

        // Wil check if media is in list before adding to list

        ShowService.isMediaAlreadyInList(ListId, id, type)
            .then((response) => {
                setStatusMessage(response.data);

                if (response.data.status_message === "Success.") {
                    if (type === "tv") {
                        alert(`${media.name} is already in ${ListName}`);
                    } else if (type === "movie") {
                        alert(`${media.title} is already in ${ListName}`);
                    }
                } else {
                    // If it's not in the list, this should make the API call to add it
                    ShowService.addItemTolist(ListId, payload).then(() => {
                        if (type === "tv") {
                            alert(`${media.name} was added to ${ListName}`);
                        } else if (type === "movie") {
                            alert(`${media.title} was added to ${ListName}`);
                        }
                    }).catch((error) => {
                        alert("Failed to add to list.");
                        console.error(error);
                    });
                }
            })
            .catch((error) => {
                console.error("Error checking list status", error);
            });

    }

    const trailer = mediavideos?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
    ) || mediavideos?.find(
        (video) => video.site === "YouTube"
    );

    return (
        <div>
            <div className="relative w-full min-h-[600px] flex justify-center pt-12 pb-20">

                <div className="absolute inset-0 z-0 overflow-hidden">
                    {images?.[0]?.file_path && (
                        <img
                            src={`${imagepath}${images[0].file_path}`}
                            alt="Background"
                            className="w-full h-full object-cover opacity-40 blur-xl scale-110"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-5 w-full flex flex-col md:flex-row gap-10 items-center md:items-start">

                    <div className="flex-shrink-0">
                        {media.poster_path && (
                            <img
                                className="w-[280px] md:w-[320px] rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] border border-zinc-800"
                                src={`${imagepath}${media.poster_path}`}
                                alt={media.name || media.title}
                                loading="lazy"
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-6 w-full pt-4 md:pt-10">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
                                {media.name || media.title}

                            </h1>

                            <div className="mt-2">
                                <div >{type === "TV" ? <></> : <section> <div className="flex gap-1">{media.genres && media.genres.map((med, index) => (<div>{med.name}{index < media.genres.length - 1 ? ', ' : ''}</div>))}</div></section>}</div>

                            </div>



                            <div className="flex gap-3 text-zinc-300 text-sm mt-4 font-semibold">
                                <MetaTag value={media.release_date?.substring(0, 4) || media.first_air_date?.substring(0, 4)} />
                                {type === "movie" ?
                                    <MetaTag value={time} /> : ""}
                            </div>
                        </div>

                        <p className="text-zinc-300 text-lg leading-relaxed max-w-3xl drop-shadow-sm">
                            {media.overview}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-2">
                            <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors shadow-lg" popoverTarget="trailer-modal" onClick={() => setShowTrailer(true)}>
                                <span className="text-xl">▶</span> Play Trailer
                            </button>



                            <div className="modal" id="trailer-modal" popover="auto">

                                <div className="modal-box w-11/12 max-w-4xl bg-transparent shadow-none p-0 overflow-hidden">
                                    {showTrailer && trailer ? (
                                        <iframe
                                            className="w-full mx-auto aspect-video rounded-xl"
                                            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                                            title={trailer.name}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : showTrailer ? (
                                        <div className="p-10 text-center text-white font-bold bg-zinc-900 rounded-xl">
                                            No trailer available for this title.
                                        </div>
                                    ) : null}
                                </div>

                                <div className="modal-backdrop fixed inset-0 bg-black/85 z-[-1]" onClick={() => setShowTrailer(false)}>
                                    <button
                                        className="w-full h-full cursor-default text-transparent"
                                        popoverTarget="trailer-modal"
                                        popoverTargetAction="hide"
                                    >
                                        close
                                    </button>
                                </div>
                            </div>



                            <button className="flex items-center gap-2 bg-zinc-900/60 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold hover:bg-zinc-800 transition-colors border border-zinc-700 shadow-lg">
                                ▤ Gallery ({images?.length || 0})
                            </button>
                        </div>

                        <div className="flex gap-5">
                            <button
                                className="border-0 bg-transparent text-left cursor-pointer text-4xl"
                                onClick={handleClick}
                            >
                                <FontAwesomeIcon icon={heart} />
                            </button>

                            <div className="dropdown dropdown-bottom dropdown-center z-10" onClick={(e) => e.preventDefault()}>
                                <div tabIndex={0} role="button" className="text-4xl">
                                    <FontAwesomeIcon icon={faList} />
                                </div>
                                <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    {lists.map((list, index) => (
                                        <li key={index} value={list.id} >
                                            <button onClick={() => handleListSelect(list.id, list.name)}>{list.name}</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                className="border-0 bg-transparent text-left cursor-pointer text-4xl"
                                onClick={handleBookmark}
                            >
                                <FontAwesomeIcon icon={bookmark} />
                            </button>

                        </div>
                    </div>

                </div>
            </div>

            {providers.length > 0 && (

                <div className="text-center justify-center flex p-5">
                    {providers.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-white font-bold mb-3">Where to Watch</h3>
                            <div className="flex gap-3 flex-wrap">
                                {providers.map((provider) => (
                                    <div key={provider.provider_id} title={provider.provider_name}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                            alt={provider.provider_name}
                                            className="w-12 h-12 rounded-xl object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            {/* Cast & Crew */}

            {/* Seasons Overview (Only renders for TV shows) */}
            {type === 'tv' && media.seasons?.length > 0 && (
                <div className="max-w-7xl mx-auto px-5 mt-16 mb-8">
                    <h2 className="text-3xl font-bold text-white mb-6">Seasons</h2>

                    <div className="carousel carousel-center w-full space-x-5 pb-4">

                        {media.seasons.map((season) => (
                            <div key={season.id} className="carousel-item flex-col w-[160px] group">

                                {season.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w342${season.poster_path}`}
                                        alt={season.name}
                                        className="w-full h-[240px] rounded-xl object-cover shadow-lg border border-zinc-800 transition-colors group-hover:border-zinc-500"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-[240px] rounded-xl bg-zinc-800 border border-zinc-700 flex flex-col items-center justify-center text-zinc-500 p-2 text-center shadow-lg">
                                        <span className="font-bold text-sm">{season.name}</span>
                                    </div>
                                )}

                                <div className="mt-3 flex flex-col gap-1">
                                    <h3 className="text-white font-bold truncate">{season.name}</h3>

                                    <div className="flex items-center gap-2 text-xs text-zinc-400 font-semibold">
                                        {season.air_date && (
                                            <span className="bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-md">
                                                {season.air_date.substring(0, 4)}
                                            </span>
                                        )}
                                        <span>{season.episode_count} Episodes</span>
                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>
            )}

            <CastandCrewCarousel people={credits} />

            {reviews?.length > 0 ? (
                <ReviewCarousel reviews={reviews} />
            ) : (
                <div className="text-zinc-500 italic text-center bg-zinc-900/40 rounded-xl border border-zinc-800 text-wrap p-5 pl-5 pr-5 max-w-fit m-auto mb-10">
                    Be the first to leave a review.
                </div>
            )}

            {/* Media Gallery Preview */}
            {images?.length > 1 && (
                <div className="max-w-7xl mx-auto px-5 mt-16 mb-12">

                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-2xl font-bold text-white">Backdrops</h2>
                        <span className="text-sm font-bold text-zinc-500">
                            {images.length} Total Images
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {images.slice(1, 4).map((image, index) => (
                            <div
                                key={image.file_path}
                                className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 group"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                                    alt={`${media.name || media.title} Backdrop ${index + 1}`}
                                    className="w-full h-[180px] md:h-[220px] object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                                    loading="lazy"
                                />
                            </div>
                        ))}

                    </div>
                </div>
            )}

            {/* Production Specs Grid */}
            <div className="max-w-7xl mx-auto px-5 mt-16 mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Production Specs</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800">

                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</span>
                        <span className="text-zinc-200 font-semibold">{media.status || "-"}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Language</span>
                        <span className="text-zinc-200 font-semibold uppercase">
                            {media.original_language || "-"}
                        </span>
                    </div>

                    {type === "movie" && (
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Budget</span>
                            <span className="text-zinc-200 font-semibold">
                                {media.budget && media.budget > 0
                                    ? `$${media.budget.toLocaleString()}`
                                    : "Not Disclosed"}
                            </span>
                        </div>
                    )}

                    {type === "movie" && (
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Revenue</span>
                            <span className="text-zinc-200 font-semibold">
                                {media.revenue && media.revenue > 0
                                    ? `$${media.revenue.toLocaleString()}`
                                    : "-"}
                            </span>
                        </div>
                    )}

                    {type === "tv" && (
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Network</span>
                            <span className="text-zinc-200 font-semibold truncate">
                                {media.networks?.length > 0 ? media.networks[0].name : "-"}
                            </span>
                        </div>
                    )}

                    {type === "tv" && (
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Type</span>
                            <span className="text-zinc-200 font-semibold">
                                {media.type || "-"}
                            </span>
                        </div>
                    )}

                    <div className="flex flex-col gap-1 col-span-2 md:col-span-4 lg:col-span-2">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Studios</span>
                        <span className="text-zinc-200 font-semibold">
                            {media.production_companies?.length > 0
                                ? media.production_companies.map(company => company.name).join(", ")
                                : "-"}
                        </span>
                    </div>

                </div>
            </div>

            <MediaCarousel media={similar} title={type == "movie" ? "Similar Movies" : "Similar Shows"} type={type == "movie" ? "movie" : "tv"}/>




        </div>
    );

}