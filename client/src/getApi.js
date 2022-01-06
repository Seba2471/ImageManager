import axios from 'axios';
import store from './store';
import VueAuthImage from 'vue-auth-image';

async function refreshToken(error) {
  if (error.response.status === 401 && store.getters.isAuthenticated) {
    if (await store.dispatch('refresh')) {
      VueAuthImage.setup(store.getters.getAccessToken);
      const config = { ...error.response.config };
      console.log(config);
      config.headers.Authorization = `Bearer ${store.getters.getAccessToken}`;
      window.location.reload();
      return axios(config);
    }
    throw error;
  }
  throw error;
}

export default () => {
  const getAPI = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
      Authorization: `Bearer ${store.getters.getAccessToken}`,
    },
  });
  getAPI.interceptors.response.use((response) => response, refreshToken);
  return getAPI;
};
