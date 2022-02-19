import axios from 'axios';
import store from './store';
import VueAuthImage from 'vue-auth-image';
import { baseUrl, UrlLengthLimit } from './config.js';

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

async function UriTooLong(error) {
  if (error.response.status === 403 && error.response.data === 'Request Uri too long') {
    const ids = error.response.config.url.split('=')[1].split(',');
    const idsCount = ids.length;
    const maxIds = Math.ceil(UrlLengthLimit / 24) - 2;

    let i = 0;
    while (i < idsCount) {
      const idsToDelete = ids.filter((id, index) => {
        if (index >= i && index <= i + maxIds - 1) {
          return id;
        }
      });
      await store.dispatch('deleteImages', idsToDelete);

      i += maxIds;
    }
  }
}

export default () => {
  const getAPI = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${store.getters.getAccessToken}`,
    },
  });
  getAPI.interceptors.response.use((response) => response, refreshToken);
  getAPI.interceptors.response.use((response) => response, UriTooLong);
  return getAPI;
};
