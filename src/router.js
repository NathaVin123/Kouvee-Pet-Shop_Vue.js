import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const dashboardUser = () => import(/* webpackChunkName: "dashboard" */ './views/admins/dashboardAdmin.vue')
const navbarBefore = () => import(/* webpackChunkName: "navbarbefore" */ './views/Homepage.vue')  
const navbarAfter = () => import(/* webpackChunkName: "navbarbefore" */ './views/users/Homepage.vue') 

function loadView(view) {
    return () => import(/* webpackChunkName: "view[request]" */ `./views/admins/adminContents/${view}.vue`) 
}

function loadViewBefore(view) {
  return () => import(/* webpackChunkName: "view[request]" */ `./views/${view}.vue`) 
}

function loadViewAfter(view) {
  return () => import(/* webpackChunkName: "view[request]" */ `./views/users/${view}.vue`) 
}

    Vue.use(Router)   
    //const router = new Router({mode: 'history', routes: routes})   

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: navbarBefore,
      children: [
        {
          path: '',
          name: 'Welcome',
          component: loadViewBefore('Welcome')           
        },
        {
          path: '/views/dashboard',
          name: 'dashboard',
          component: loadViewBefore('Dashboard')           
        },
        {
          path: '/views/signin',
          name: 'SignIn',
          component: loadViewBefore('SignIn')
        },
        {
          path: '/views/signup',
          name: 'SignUp',
          component: loadViewBefore('SignUp')
        },
        {
          path: '/views/about',
          name: 'about',
          component: loadViewBefore('About')
        },
      ]
    },
    {
      path: '/views/users/',
      component: navbarAfter,
      children: [
        {
          path: '/views/users/',
          name: 'Welcome',
          component: loadViewAfter('Welcome')           
        },
        {
          path: '/views/users/YourLyric',
          name: 'YourLyric',
          component: loadViewAfter('YourLyric')
        },
        {
          path: '/views/users/dashboardUser',
          name: 'dashboardUser',
          component: loadViewAfter('dashboardUser')           
        },
        {
          path: '/views/users/aboutUser',
          name: 'aboutUser',
          component: loadViewAfter('About')
        },
      ]
    },    
    {       
      path: '/admins/dashboardAdmin',       
      component: dashboardUser,       
      children: [         
          {           
              name: 'userAdmin',           
              path: '/admins/adminContents/userAdmin',           
              component: loadView('userAdmin')         
          },
          {           
            name: 'lyricAdmin',           
            path: '/admins/adminContents/lyricAdmin',           
            component: loadView('lyricAdmin')         
          },
          {           
            name: 'commentAdmin',           
            path: '/admins/adminContents/commentAdmin',           
            component: loadView('commentAdmin')         
          },
          {           
            name: 'layananAdmin',           
            path: '/admins/adminContents/layananAdmin',           
            component: loadView('layananAdmin')         
          }     
      ]     
  }, 
  ],
})