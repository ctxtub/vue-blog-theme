import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Tag from '@/views/Tag'
import Post from '@/views/Post'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/tags/:slug',
      component: Tag
    },
    {
      path: '/post/:slug',
      component: Post
    },
    {
      path: '*',
      component: Index
    }
  ]
})
