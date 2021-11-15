import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Editor from '../views/Editor.vue';
import Cart from '../views/Cart.vue';
import Login from '../views/Login.vue';
import Confirm from '../views/Confirm.vue';
import User from '../views/User.vue';
import Order from '../views/Order.vue';
import Continue from '../views/Continue.vue';
import Regulamin from '../views/Regulamin.vue';
import Polityka from '../views/Polityka.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: Confirm
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '/continue',
    name: 'continue',
    component: Continue
  },
  {
    path: '/regulamin',
    name: 'regulamin',
    component: Regulamin
  },
  {
    path: '/polityka-prywatnosci',
    name: 'polityka-prywatnosci',
    component: Polityka
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
