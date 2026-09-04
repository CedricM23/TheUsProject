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

export default {
    trendingToday() {
        return watchlistAPI.get('tv/airing_today');
    }, getPopularShows() {
        return watchlistAPI.get('tv/popular');
    }, getShowbyId(series_id) {
        return watchlistAPI.get(`tv/${series_id}`)
    }, getviedosbyshow(series_id) {
        return watchlistAPI.get(`tv/${series_id}/videos`)
    }, getTopRatedMovies() {
        return watchlistAPI.get('movie/top_rated')
    }, getPopularMovies() {
        return watchlistAPI.get('movie/popular')
    }, getMoviebyId(movie_id) {
        return watchlistAPI.get(`/movie/${movie_id}`)
    }, createlist(body) {
        return listAPI.post(`/list`, body);
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
    }, isMediaAlreadyInList(listid, MediaId, mediaType){
        return listAPI.get(`list/${listid}/item_status?media_id=${MediaId}&media_type=${mediaType}`)
    }, DeleteItemFromList(id, body){
        return listAPI.delete(`list/${id}/items`, { data: body })
    } , GetUpcomingMovies(){
        return watchlistAPI.get('https://api.themoviedb.org/3/movie/upcoming')
    }, DiscoverShows(){
        return watchlistAPI.get('https://api.themoviedb.org/3/discover/tv')
    }
}