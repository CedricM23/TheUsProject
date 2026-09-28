import axios from 'axios';

axios.defaults.baseURL =  import.meta.env.VITE_BASE_API;

export default {

    // --- DATE EVENTS ---
    createDateEvent(dateEvent) {
        return axios.post('/api/dateevents/', dateEvent);
    },

    getAllDateEvents() {
        return axios.get('/api/dateevents/');
    },

    getDateEventById(dateEventId) {
        return axios.get(`/api/dateevents/${dateEventId}`);
    },

    updateDateEvent(dateEventId, dateEvent) {
        return axios.put(`/api/dateevents/${dateEventId}`, dateEvent);
    },

    deleteDateEvent(dateEventId) {
        return axios.delete(`/api/dateevents/${dateEventId}`);
    }

}