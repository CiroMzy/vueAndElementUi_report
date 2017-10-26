import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import Report from '@/pages/report/report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/report',
      name: 'Report',
      component: Report
    }
  ]
})
