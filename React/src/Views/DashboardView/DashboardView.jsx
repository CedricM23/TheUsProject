import { useEffect, useState } from "react"
import ShowService from "../../services/ShowService"
import DateCarousel from "../../components/DateCarousel/DateCarousel"
import DatesService from "../../services/DatesService"
import MediaCarousel from "../../components/MediaCarousel/MediaCarousel"

export default function DashboardView() {
    // Test - This page will start with dates then cascade with recommended moveis, popular, and more
    const [popularMovies, SetPopularMovies] = useState([])
    const [upcomingMovies, SetUpcomingMovies] = useState([])
    const [popularTv, SetPopularTv] = useState([])
    const [dates, SetDates] = useState([])
    const [actionMovies, SetActionMovies] = useState([])
    const [adventureMovies, SetAdventureMovies] = useState([])
    const [dramaMovies, SetDramaMovies] = useState([])
    const [comedyMovies, SetComedyMovies] = useState([])
    const [documentaries, SetDocumentaries] = useState([])


    useEffect(() => {
        ShowService.getPopularMovies().then(
            (Response) => {
                SetPopularMovies(Response.data.results);
            })
        DatesService.getAllDateEvents().then(
            (Response) => {
                SetDates(Response.data)
            }
        )
        ShowService.getUpcomingMovie().then(
            (Response) => {
                SetUpcomingMovies(Response.data.results)
            })
        ShowService.getPopularShows().then(
            (Response) => (
                SetPopularTv(Response.data.results)
            ))
        ShowService.GetMoviesByGenre(28).then(
            (Response) => (
                SetActionMovies(Response.data.results)
            )
        )
        ShowService.GetMoviesByGenre(12).then(
            (Response) => (
                SetAdventureMovies(Response.data.results)
            )
        )
        ShowService.GetMoviesByGenre(18).then(
            (Response) => (
                SetDramaMovies(Response.data.results)
            )
        )
        ShowService.GetMoviesByGenre(35).then(
            (Response) => (
                SetComedyMovies(Response.data.results)
            )
        )
        ShowService.GetMoviesByGenre(99).then(
            (Response) => (
                SetDocumentaries(Response.data.results)
            )
        )
    }, [])

    return (
        <div className="m-5 text-white flex flex-col gap-5">
            {dates && dates.length > 0 ? (
                <DateCarousel dates={dates} />
            ) : (
                <div className="flex justify-center items-center p-8 mt-8">
                    <p className="text-xl font-['Libre_Baskerville',_serif] text-gray-500">
                        Save a date
                    </p>
                </div>
            )}
            <MediaCarousel media={popularMovies} title="Popular Movies" type="movie" />
            <MediaCarousel media={upcomingMovies} title="Upcoming Movies" type="movie" />
            <MediaCarousel media={actionMovies} title="Action Movies" type="movie" />
            <MediaCarousel media={adventureMovies} title="Adventure Movies" type="movie" />
            <MediaCarousel media={dramaMovies} title="Drama Movies" type="movie" />
            <MediaCarousel media={comedyMovies} title="Comedy Movies" type="movie" />
            <MediaCarousel media={documentaries} title="Documentaries" type="movie" />
            <MediaCarousel media={popularTv} title="Popular Shows" type="tv" />
        </div>
    )
}