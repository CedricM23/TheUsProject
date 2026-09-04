import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:9000';

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

}
