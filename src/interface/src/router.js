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
      path: '/userSettings/:id',
      name: 'UserSettings',
      component: () => import('./views/UserSettings.vue')
    },
    {
      path: '/albums/:id',
      name: 'Album',
      component: () => import('./views/Album.vue')
    },
    {
      path: '/artists/:id',
      name: 'Artist',
      component: () => import('./views/Artist.vue')
    },
    {
      path: '/areas/:id',
      name: 'Area',
      component: () => import('./views/Area.vue')
    },
    {
      path: '/recordings/:id',
      name: 'Recording',
      component: () => import('./views/Recording.vue')
    },
    {
      path: '/recordings/search',
      name: 'Recordings Search',
      component: () => import('./views/RecordingsSearch.vue')
    }
  ]
})
