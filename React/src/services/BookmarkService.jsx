import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:9000';

export default {
    

    addBookmark(tmdbMediaId, mediaType) {
        return axios.post('/api/bookmarks/new', {
            tmdbMediaId: tmdbMediaId,
            mediaType: mediaType
        });
    },

    checkBookmark(tmdbMediaId, mediaType) {
        return axios.get(`/api/bookmarks/check?tmdbMediaId=${tmdbMediaId}&mediaType=${mediaType}`);
    },

    getMyBookmarks() {
        return axios.get('/api/bookmarks');
    },

   removeBookmark(tmdbMediaId, mediaType) {
        return axios.delete(`/api/bookmarks/remove?tmdbMediaId=${tmdbMediaId}&mediaType=${mediaType}`);
    }
    
}