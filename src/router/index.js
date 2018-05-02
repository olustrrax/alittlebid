import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import SignIn from '@/components/SignIn'
import Register from '@/components/Register'
import Product from '@/components/Product'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: Main,
      meta:{
        requiresAuth : true
      }
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/product',
      name:'product',
      component:Product,
      meta:{
        requiresAuth : true
      }
    },
    {
      path:'*',
      redirect:'/signin'
    },
    {
      path:'/',
      redirect:'/signin'
    },
    {
      path:'/signin',
      name:'SignIn',
      component:SignIn
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next('signin')
  } else if (!requiresAuth && currentUser) {
    next('main')
  } else {
    next()
  }
})

export default router