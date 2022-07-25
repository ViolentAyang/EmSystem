import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Data from '../views/Data.vue'
import User from '../views/User.vue'
import About from '../views/About.vue'
import Class from '../views/Class.vue'
import graduateDemands from '../views/DataManage/graduateDemands.vue'
import yearMajorClass from '../views/DataManage/yearMajorClass.vue'
import point from '../views/DataManage/point.vue'
import trainingPlan from '../views/DataManage/trainingPlan.vue'
import assign from '../views/DataManage/assign.vue'

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
  {
    path: '/Class',
    name: 'Class',
    component: Class
  },
  {
    path: '/graduateDemands',
    name: 'graduateDemands',
    component: graduateDemands
  },
  {
    path: '/point',
    name: 'point',
    component: point
  },
  {
    path: '/trainingPlan',
    name: 'trainingPlan',
    component: trainingPlan
  },
  {
    path: '/assign',
    name: 'assign',
    component: assign
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
