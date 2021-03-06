import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import SignIn from '@/components/SignIn'
import Register from '@/components/Register'
// import SentMail from '@/components/SentMail'
import Bid from '@/components/Bid'
import Product from '@/components/Product'
import List from '@/components/ProductList'
import EditUser from '@/components/EditUser'
import Refill from '@/components/Refill'
import ProductType from '@/components/ProductListByType'
import History from '@/components/History'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: Main,
    },
    {
      path: '/product/:Type',
      name: 'ProductType',
      component: ProductType,
      props:true,
      // meta:{
      //   requiresAuth:true
      // }
    },
    {
      path:'/product',
      name:'product',
      component:Product,
      meta:{
        requiresAuth:true
      }
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
      redirect:'/main'
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
      },
      props:true
    },
    {
      path:'/edituser',
      name:'EditUser',
      component:EditUser,
      meta:{
        requiresAuth:true
      }
    },
    {
      path:'/refill',
      name:'Refill',
      component:Refill,
      meta:{
        requiresAuth:true
      }
    },
    {
      path:'/history',
      name:'History',
      component:History,
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
  // } else if (!requiresAuth && currentUser) {
  //   next('main')
  } else {
    next()
  }
})

export default router