import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/views/pages/Index.vue';
import DashboardLayout from '@/views/layout/DashboardLayout.vue';
import Monitor from '@/views/pages/Monitor.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
    ],
  },
  {
    path: '/monitor',
    component: Monitor,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
