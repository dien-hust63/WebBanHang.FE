const routerManagement = [
    {
        path: '/management',
        redirect:"/management/order",
      },
      {
        path: '/management/customer',
        name: 'm-customer',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "customer" */ '../../views/management/customer/CustomerList.vue')
      },
      {
        path: '/management/order',
        name: 'm-order',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "order" */ '../../views/management/order/OrderList.vue')
      },
      {
        path: '/management/promotion',
        name: 'm-promotion',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "promotion" */ '../../views/management/promotion/PromotionList.vue')
      },
      {
        path: '/management/report',
        name: 'm-report',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "promotion" */ '../../views/management/report/ReportList.vue')
      },
      {
        path: '/management/setting',
        component: () =>
                        import(/*webpackChunkName "branch" */ '../../views/management/setting/Setting.vue'),
        children: [
                { path: '', redirect: 'branch' },
                {
                    path: 'branch',
                    name: "m-branch",
                    component: () =>
                        import(/*webpackChunkName "branch" */ '../../views/management/branch/BranchList.vue')
                },
                {
                    path: 'employee',
                    name: "m-employee",
                    component: () =>
                        import(/*webpackChunkName "employee" */ '../../views/management/employee/EmployeeList.vue')
                },
                {
                  path: 'employee/:id',
                  name: "m-employee-detail",
                  component: () =>
                      import(/*webpackChunkName "employee" */ '../../views/management/employee/EmployeeDetail.vue')
                },
                {
                    path: 'role',
                    name: "m-role",
                    component: () =>
                        import(/*webpackChunkName "role" */ '../../views/management/role/RoleList.vue')
                },
            ]
      },
]
export default routerManagement;