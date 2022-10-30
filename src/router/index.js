import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/order"
  },
  {
    path: '/customer',
    name: 'm-customer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "customer" */ '../views/management/customer/CustomerList.vue')
  },
  {
    path: '/order',
    name: 'm-order',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "order" */ '../views/management/order/OrderList.vue')
  },
  {
    path: '/promotion',
    name: 'm-promotion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "promotion" */ '../views/management/promotion/PromotionList.vue')
  },
  {
    path: '/report',
    name: 'm-report',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "promotion" */ '../views/management/report/ReportList.vue')
  },
  {
    path: '/setting',
    component: () =>
					import(/*webpackChunkName "branch" */ '../views/management/setting/Setting.vue'),
    children: [
			{ path: '', redirect: 'branch' },
			{
				path: 'branch',
				name: "m-branch",
				component: () =>
					import(/*webpackChunkName "branch" */ '../views/management/branch/BranchList.vue')
			},
      {
				path: 'employee',
				name: "m-employee",
				component: () =>
					import(/*webpackChunkName "employee" */ '../views/management/employee/EmployeeList.vue')
			},
      {
				path: 'role',
				name: "m-role",
				component: () =>
					import(/*webpackChunkName "role" */ '../views/management/role/RoleList.vue')
			},
			
      
		]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
