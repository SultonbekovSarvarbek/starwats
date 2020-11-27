import Vue from 'vue';
import VueRouter from 'vue-router';
import persons from '@/views/persons.vue';
import personDetails from '@/views/person-details.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/persons',
    component: persons,
    children: [
      {
        path: '/persons',
      },
    ],
  },

  {
    path: '/person/:id',
    name: 'personDetails',
    component: personDetails,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
