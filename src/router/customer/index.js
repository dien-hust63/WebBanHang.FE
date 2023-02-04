const routerCustomer = [
    {
        path: '/',
        name: 'c-home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "homecustomer" */ '../../views/customer/home/Home.vue'),
        children: [
          {
              path: '',
              name: "c-main-home",
              component: () =>
                  import(/*webpackChunkName "mainhome" */ '../../views/customer/home/CMainHome.vue')
          },
          {
            path: 'product',
            name: "c-product-detail",
            component: () =>
                import(/*webpackChunkName "productdetail" */ '../../views/customer/product/CProductDetail.vue')
          },
          {
            path: 'cart',
            name: "c-cart",
            component: () =>
                import(/*webpackChunkName "cart" */ '../../views/customer/cart/CCart.vue')
          },
        ]
      },
      {
        path: '/checkout',
        name: 'c-checkout',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "checkout" */ '../../views/customer/checkout/Checkout.vue'),
      },
]
export default routerCustomer;