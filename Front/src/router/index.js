import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import SignIn from '@/components/SignIn'
import Register from '@/components/Register'
// import SentMail from '@/components/SentMail'
import Bid from '@/components/Bid'
import Product from '@/components/Product'
import List from '@/components/ProductList'
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
      path:'/product',
      name:'product',
      component:Product,
    },
    {
      path:'/list',
      name:'list',
      component:List,
    },
    {
      path:'/register',
      name:'register',
      component:Register,
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
    },
    {
      path:'/bid',
      name:'Bid',
      component:Bid,
      meta:{
        requiresAuth:true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // console.log(currentUser.uid)
  if (requiresAuth && !currentUser) {
    next('signin')    
  } else if (!requiresAuth && currentUser) {
    next('main')
  } else {
    next()
  }
})

export default router