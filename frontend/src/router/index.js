import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('../views/Pay.vue')
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import('../views/AddView.vue')
  },
  {
    path: '/admin',
    name: 'AdminUsers',
    adminPath: true,
    component: () => import('../views/AdminUsers.vue')
  },{
    path: '/admin/orders',
    name: 'AdminOrders',
    adminPath: true,
    component: () => import('../views/AdminOrders.vue')
  },{
    path: '/admin/products',
    name: 'AdminProducts',
    adminPath: true,
    component: () => import('../views/AdminProducts.vue')
  },{
    path: '/admin/adds',
    name: 'AdminAdd',
    adminPath: true,
    component: () => import('../views/AdminAdd.vue')
  },
]

export const isAdminPath=(path)=>{
  return routes.some(route => route.path === path && route.adminPath)
}

const router = new VueRouter({
  routes
})

export default router
