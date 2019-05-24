import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/SignUp.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('./views/Index.vue')
    },
    {
      path: '/albums',
      name: 'Albums',
      component: () => import('./views/Albums.vue')
    },
    {
      path: '/artists',
      name: 'Artists',
      component: () => import('./views/Artists.vue')
    },
    {
      path: '/areas',
      name: 'Areas',
      component: () => import('./views/Areas.vue')
    },
    {
      path: '/recordings',
      name: 'Recordings',
      component: () => import('./views/Recordings.vue')
    },
    {
      path: '/userSettings',
      name: 'UserSettings',
      component: () => import('./views/UserSettings.vue')
    }
  ]
})
