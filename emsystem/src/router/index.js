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
import supportEstate from '../views/DataManage/supportEstate.vue'

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
    path: '/home/:userId',
    name: 'Home',
    component: Home
  },
  {
    path: '/data/:userId',
    name: 'Data',
    component: Data
  },
  {
    path: '/user/:userId',
    name: 'User',
    component: User
  },
  {
    path: '/about/:userId',
    name: 'About',
    component: About
  },
  {
    path: '/yearMajorClass/:userId',
    name: 'yearMajorClass',
    component: yearMajorClass
  },
  {
    path: '/Class/:userId',
    name: 'Class',
    component: Class
  },
  {
    path: '/graduateDemands/:userId',
    name: 'graduateDemands',
    component: graduateDemands
  },
  {
    path: '/point/:userId',
    name: 'point',
    component: point
  },
  {
    path: '/trainingPlan/:userId',
    name: 'trainingPlan',
    component: trainingPlan
  },
  {
    path: '/assign/:userId',
    name: 'assign',
    component: assign
  },
  {
    path: '/supportEstate/:userId',
    name: 'supportEstate',
    component: supportEstate
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

//挂载一个路由导航守卫
router.beforeEach((to, from, next) => {
  if(to.path == '/login') return next()
  //先获取token
  const tokenStr = window.sessionStorage.getItem('token')
  //没有token跳转到登录页
  if(!tokenStr) return next('/login')
  //有token放行，token真假以及时效性放在后端验证了
  next()
})

export default router
