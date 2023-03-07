import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import RegisterUser from '../views/RegisterUser.vue';
import About from '../views/About.vue';
import chat from '../views/test.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/RegisterUser',
      name: 'register',
      component: RegisterUser,
    },
    {
      path: '/Login',
      name: 'login',
      component: Login,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/ghat',
      name: 'ghat',
      component: chat,
    }
  ]
});



export default router;



