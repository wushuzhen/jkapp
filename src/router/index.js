import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: () => import('../views/Error.vue'),
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/message',
    component: () => import('../views/Message.vue')
  },  
  {
    path: '/admin',
    component: () => import('../views/Admin.vue'),
  },
  {
    path: '/adminUserInfo',
    component: () => import('../views/AdminUserInfo.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export default router
