import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "home" */ '../views/Login'),
    beforeEnter(to, from, next) {
      const  isLogin  = localStorage.isLogin;//等价于const isLogin=localStorage.isLogin
      isLogin ? next({ name: 'Home'}):  next();
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home')
    
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import(/* webpackChunkName: "home" */ '../views/Recommend')
    
  },
  {
    path: '/person',
    name: 'Person',
    component: () => import(/* webpackChunkName: "home" */ '../views/Person')
    
  },
  {
    path:'/information',
    name:'Information',
    component: () => import(/* webpackChunkName: "home" */ '../views/Information')
  },
  {
    path:'/record',
    name:'Record',
    component: () => import(/* webpackChunkName: "home" */ '../views/Record')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "home" */ '../views/Register')
    
  },
  {
    path: '/study/:id',
    name: 'Study',
    component: () => import(/* webpackChunkName: "home" */ '../views/Study')
    
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "home" */ '../views/Search')
    
  },
  {
    path: '/changePassword',
    name: 'ChangePassword',
    component: () => import(/* webpackChunkName: "home" */ '../views/ChangePassword')
    
  },

  {
    path: '/administer',
    name: 'Administer',
    component: () => import(/* webpackChunkName: "home" */ '../admin/Administer')
    
  },

 
  {
      path: '/stuInfo',
      name: 'StuInfo',
      component: () => import(/* webpackChunkName: "home" */ '../admin/StuInfo')
      
  },

  {
    path: '/vidioInfo',
    name: 'VidioInfo',
    component: () => import(/* webpackChunkName: "home" */ '../admin/VidioInfo')
    
  },
  {
    path: '/alogin',
    name: 'Alogin',
    component: () => import(/* webpackChunkName: "home" */ '../admin/Alogin')
    
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from ,next) => {
  const  isLogin  = localStorage.isLogin;
  (isLogin || to.name == "Login"||to.name=="Register"||to.name=="Alogin") ? next() : next({ name: 'Login'});
})

export default router
