import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:9000';

export default {

    addFavorite(tmdbMediaId, mediaType) {
        return axios.post('/api/favorites/new', {
            tmdbMediaId: tmdbMediaId,
            mediaType: mediaType
        });
    },

    checkFavorite(tmdbMediaId, mediaType) {
        return axios.get(`/api/favorites/check?tmdbMediaId=${tmdbMediaId}&mediaType=${mediaType}`);
    },

    getMyFavorites() {
        return axios.get('/api/favorites/');
    },

    removeFavorite(tmdbMediaId, mediaType) {
        return axios.delete(`/api/favorites/remove?tmdbMediaId=${tmdbMediaId}&mediaType=${mediaType}`);
    }

}