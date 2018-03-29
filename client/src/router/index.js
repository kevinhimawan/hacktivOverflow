import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Post from '@/components/containerContent/SpecificPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home',
      children: [{
        path: '/post/:postid',
        name: 'Post',
        component: Post,
        props: true
      }]
    }
  ]
})
