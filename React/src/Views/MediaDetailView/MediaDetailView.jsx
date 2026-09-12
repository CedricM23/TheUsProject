import { useParams } from "react-router";
import ShowService from "../../services/ShowService";
import { useEffect, useState } from "react";
import MetaTag from "../../components/MetaTag/MetaTag";
import CastandCrewCarousel from "../../components/CastandCrewCarousel/CastandCrewCarousel";

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

    // const payload = {
    //     items: [
    //         {
    //             media_type: type,
    //             media_id: id
    //         }
    //     ]
    // }
    // let selectedListId;


    useEffect(() => {
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

        }
        // ShowService.getlists()
        //     .then((response) => {
        //         setLists(response.data.results)
        //     }).catch((error) => {
        //         alert('Could not get your lists! please try again!')
        //     })

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
    }, [id])


    // function handleChange(e) {
    //     //Sets selected list to current selected value
    //     const selectedListId = e.target.value;
    // }

    // Add this right before your return statement
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
                    </div>

                </div>
            </div>


            {/* Cast & Crew */}
            
            <CastandCrewCarousel people={credits}/>

        </div>
    );

}