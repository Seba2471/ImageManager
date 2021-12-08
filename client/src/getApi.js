import axios from 'axios';
import store from './store';

async function refreshToken(error) {
  if (error.response.status === 401) {
    if (await store.dispatch('refresh')) {
      const config = { ...error.response.config };
      config.headers.Authorization = `Bearer ${store.getters.getAccessToken}`;
      return axios(config);
    }
  }
}

export default () => {
  const getAPI = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
      Authorization: `Bearer ${store.getters.getAccessToken}`,
    },
  });
  return getAPI;
};

axios.interceptors.response.use((response) => response, refreshToken);
