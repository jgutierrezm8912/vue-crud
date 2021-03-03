import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import newUser from '@/components/newUser'
import viewUser from '@/components/viewUser'
import editUser from '@/components/editUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-user',
      component: newUser
    },
    {
      path: '/edit/:id',
      name: 'edit-user',
      component: editUser
    },
    {
      path: '/:id',
      name: 'view-user',
      component: viewUser
    }
  ]
})
