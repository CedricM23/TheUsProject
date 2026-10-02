import axios from 'axios';


axios.defaults.baseURL = import.meta.env.VITE_BASE_API;

export default {

  login(user) {
    return axios.post('/login', user);
  },

  register(user) {
    return axios.post('/register', user);
  },

  getUserProfile(userId) {
    return axios.get(`/users/${userId}`);
  },
    updateUser(userId, userData) {
    return axios.post(`api/users/${userId}/update`, userData);
  },
  statuscheck(){
    return axios.get('/health')
  }

}
