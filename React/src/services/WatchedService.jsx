import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_API;


export default {
    addToWatched(tmdbMediaId, mediaType, runtime) {
        return axios.post("/api/watched/", {
            tmdbMediaId: tmdbMediaId,
            mediaType: mediaType,
            runtime: runtime
        })
    },
    checkWatched(tmdbMediaId, mediaType) {
        return axios.get(`api/watched/check?tmdbMediaId=${tmdbMediaId}&mediaType=${mediaType}`)
    },
    getStats() {
        return axios.get(`api/watched/stats`);
    },
    removeWatched(tmdbMediaId, mediaType) {
        return axios.delete(`api/watched/remove?tmdbMediaId=${tmdbMediaId}&mediaType=${mediaType}`)
    },
}
