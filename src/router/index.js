import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import Jeux from '@/components/Jeux/IndexJeux'
import Jeuxend from '@/components/Jeux/Jeuxend'
import Test from '@/components/Test/IndexTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/vue',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/jeux',
      name: 'Jeux',
      component: Jeux
    },
    {
      path: '/jeuxend',
      name: 'jeuxend',
      component: Jeuxend
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
