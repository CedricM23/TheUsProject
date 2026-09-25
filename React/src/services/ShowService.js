import axios from "axios";

const watchlistAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
})

const listAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/4',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY4}`
    }
})

const listReadApi = axios.create({
    baseURL: 'https://api.themoviedb.org/4',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
})

const ScoreApi = axios.create({
    baseURL: 'http://www.omdbapi.com'
})

export default {
    //Remove hardcoded account ID
    AddToFavorites(body) {
        return watchlistAPI.post(`/account/683682df94584af5ae055fed/favorite`, body)
    },
    AddToBookMarks(body){
        return watchlistAPI.post(`/account/683682df94584af5ae055fed/watchlist`, body)
    }, checkAccountStates(id, type) {
        return watchlistAPI.get(`/${type}/${id}/account_states`);
    }, trendingToday() {
        return watchlistAPI.get('tv/airing_today');
    }, getPopularShows() {
        return watchlistAPI.get('tv/popular');
    }, getShowbyId(series_id) {
        return watchlistAPI.get(`tv/${series_id}`)
    }, GetSimilarMovies(MovieId){
        return watchlistAPI.get(`movie/${MovieId}/similar`)
    }, GetSimilarShows(ShowId){
        return watchlistAPI.get(`tv/${ShowId}/similar`)
    }, GetWatchProvidersByMovieId(MovieId){
        return watchlistAPI.get(`movie/${MovieId}/watch/providers`)
    // }, GetWatchProvidersByShowSeasonId(ShowId){
    //     return watchlistAPI.get(``)
    }, GetReviewsByMovieId(movieId){
        return watchlistAPI.get(`/movie/${movieId}/reviews`)
    }, getviedosbyshow(series_id) {
        return watchlistAPI.get(`tv/${series_id}/videos`)
    }, getviedosbymovie(MovieId) {
        return watchlistAPI.get(`/movie/${MovieId}/videos`)
    }, getTopRatedMovies() {
        return watchlistAPI.get('movie/top_rated')
    }, getPopularMovies() {
        return watchlistAPI.get('movie/popular')
    }, getMoviebyId(movie_id) {
        return watchlistAPI.get(`/movie/${movie_id}`)
    }, createlist(body) {
        return listAPI.post(`4/list`, body);
    }, getlists() {
        return listAPI.get(`/account/683682df94584af5ae055fed/lists`);
    }, getListByID(list_id) {
        return watchlistAPI.get(`list/${list_id}`)
    }, getListDetailsById(id) {
        return listAPI.get(`list/${id}?language=en-US&page=1`)
    }, deleteListById(list_id) {
        return watchlistAPI.delete(`/list/${list_id}`)
    }, getUpcomingMovie() {
        return watchlistAPI.get('/movie/upcoming')
    }, SearchQuery(Query) {
        return watchlistAPI.get(`/search/movie?query=${Query}`)
    }, tvSearchQuery(Query) {
        return watchlistAPI.get(`/search/tv?query=${Query}`)
    }, personSearchQuery(Query) {
        return watchlistAPI.get(`/search/person?query=${Query}`)
    }, addItemTolist(id, body) {
        return listAPI.post(`list/${id}/items`, body)
    }, isMediaAlreadyInList(listid, MediaId, mediaType) {
        return listAPI.get(`/list/${listid}/item_status?media_id=${MediaId}&media_type=${mediaType}`)
    }, DeleteItemFromList(id, body) {
        return listAPI.delete(`list/${id}/items`, { data: body })
    }, GetUpcomingMovies() {
        return watchlistAPI.get('/movie/upcoming')
    }, DiscoverShows() {
        return watchlistAPI.get('/discover/tv')
    }, GetMoviesByGenre(genreId) {
        return watchlistAPI.get(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`)
    }, GetShowsByGenre(genreId) {
        return watchlistAPI.get(`/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc"&with_genres=${genreId}`)
    }, GetImagesByMovieId(MovieId) {
        return watchlistAPI.get(`/movie/${MovieId}/images`)
    }, GetImagesByShowId(ShowId){
        return watchlistAPI.get(`/tv/${ShowId}/images`)
    }, GetScoreByMediaNameandYear(title, year) {
        return ScoreApi.get(`/?t=${encodeURIComponent(title)}&y=${year}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`);
    }, GetCreditsByMovieId(MovieId) {
        return watchlistAPI.get(`movie/${MovieId}/credits`)
    }, GetCreditsByShowId(ShowId) {
        return watchlistAPI.get(`tv/${ShowId}/credits`)
    }, searchMulti(query) {
        return watchlistAPI.get(`/search/multi?query=${query}&include_adult=false&language=en-US&page=1`);
    }, getDetails(mediaType, id) {
        return watchlistAPI.get(`/${mediaType}/${id}`);
    }
}