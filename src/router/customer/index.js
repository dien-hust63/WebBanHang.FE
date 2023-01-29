const routerCustomer = [
    {
        path: '/',
        name: 'c-home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "customer" */ '../../views/customer/home/Home.vue')
      },
]
export default routerCustomer;