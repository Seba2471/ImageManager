import axios from 'axios';
import store from './store';

export default () => {
  const getAPI = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
      Authorization: `Bearer ${store.getters.getAccessToken}`,
    },
  });
  return getAPI;
};
