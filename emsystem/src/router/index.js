import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Data from '../views/Data.vue'
import User from '../views/User.vue'
import About from '../views/About.vue'
import yearMajorClass from '../views/DataManage/yearMajorClass.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect:'/login',
  },
  {
    path: '/login',
    component:()=>import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/data',
    name: 'Data',
    component: Data
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/yearMajorClass',
    name: 'yearMajorClass',
    component: yearMajorClass
  },
  //{
    //path: '/about',
    //name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //}
]

const router = new VueRouter({
  routes
})

export default router
