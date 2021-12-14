import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Albums from '../views/Albums.vue';
import NewAlbum from '../views/NewAlbum.vue';
import Album from '../views/Album.vue';
import Search from '../views/Search.vue';
import store from '../store';

Vue.use(VueRouter);

function isAuthenticated(to, from, next) {
  return store.getters.getIsAuthenticated ? next() : next('Login');
}

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: isAuthenticated,
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/albums',
    name: 'Albums',
    beforeEnter: isAuthenticated,
    component: Albums,
    props: true,
  },
  {
    path: '/album/new',
    name: 'NewAlbum',
    beforeEnter: isAuthenticated,
    component: NewAlbum,
    props: true,
  },
  {
    path: '/album/:id',
    name: 'Album',
    beforeEnter: isAuthenticated,
    component: Album,
    props: true,
  },
  {
    path: '/search/:query',
    name: 'Search',
    beforeEnter: isAuthenticated,
    component: Search,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
