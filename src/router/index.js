import Vue from 'vue'
import VueRouter from 'vue-router'
import routerCustomer from './customer/index.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/management',
    redirect:"/management/order"
  },
  {
    path: '/management/customer',
    name: 'm-customer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "customer" */ '../views/management/customer/CustomerList.vue')
  },
  {
    path: '/management/order',
    name: 'm-order',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "order" */ '../views/management/order/OrderList.vue')
  },
  {
    path: '/management/promotion',
    name: 'm-promotion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "promotion" */ '../views/management/promotion/PromotionList.vue')
  },
  {
    path: '/management/report',
    name: 'm-report',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "promotion" */ '../views/management/report/ReportList.vue')
  },
  {
    path: '/management/setting',
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
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('../views/test/Profile.vue')
  },
  // {
  //   path: '/home',
  //   // lazy-loaded
  //   component: () => import("../views/test/Home.vue")
  // },
  {
    path: '/login',
    // lazy-loaded
    component: () => import('../views/management/login/Login.vue')
  },
  {
    path: '/register',
    // lazy-loaded
    component: () => import('../views/management/register/Register.vue')
  },
  ...routerCustomer
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router
