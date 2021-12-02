import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Images from '../views/Images.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Album from '../views/Album.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
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
    path: '/images',
    name: 'Images',
    component: Images,
  },
  {
    path: '/albums',
    name: 'Albums',
    component: Album,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
