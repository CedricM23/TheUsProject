import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:9000';

export default {

    // --- LISTS ---
    createList(listName) {
        return axios.post('/api/lists/new', { listName: listName });
    }, 
    
    getMyLists() {
        return axios.get('/api/lists');
    },

    deleteList(listId) {
        return axios.delete(`/api/lists/${listId}`);
    },

    // --- LIST ITEMS ---
    addItemToList(listId, tmdbMediaId, mediaType) {
        return axios.post(`/api/lists/${listId}/items`, {
            tmdbMediaId: tmdbMediaId,
            mediaType: mediaType
        });
    },

    getListItems(listId) {
        return axios.get(`/api/lists/${listId}/items`);
    },

    removeItemFromList(listId, tmdbMediaId, mediaType) {
        return axios.delete(`/api/lists/${listId}/items/remove?tmdbMediaId=${tmdbMediaId}&mediaType=${mediaType}`);
    }
}