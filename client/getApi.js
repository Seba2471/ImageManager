import axios from 'axios';
import store from './store';
import VueAuthImage from 'vue-auth-image';
import { baseUrl } from './config.js';

async function refreshToken(error) {
  if (error.response.status === 401 && store.getters.getIsAuthenticated) {
    if (await store.dispatch('refresh')) {
      VueAuthImage.setup(store.getters.getAccessToken);
      const config = { ...error.response.config };
      config.headers.Authorization = `Bearer ${store.getters.getAccessToken}`;
      return axios(config);
    } else {
      store.dispatch('logout');
    }
    throw error;
  }
  throw error;
}

export default () => {
  const getAPI = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${store.getters.getAccessToken}`,
    },
  });
  getAPI.interceptors.response.use((response) => response, refreshToken);
  return getAPI;
};
