<template>
  <div class="bkc-content-home">
    <router-view></router-view>
  </div>
</template>
  <script>
// import CProductCard from "../productcard/ProductCard.vue";
export default {
  name: "CContentHome",
  // components: {
  //   CProductCard,
  // },
  data() {
    return {
      items: [
        {
          src: "https://nvdien.blob.core.windows.net/images/banner-web.jpg",
        },
        {
          src: "https://nvdien.blob.core.windows.net/images/Banner-web-2.jpg",
        },
        {
          src: "https://nvdien.blob.core.windows.net/images/banner-web3.jpg",
        },
      ],
      product: {
        mainimage: "https://nvdien.blob.core.windows.net/images/test.jpg",
        productname: "Áo khoác nam AKHTK305",
        sellprice: "949.000",
      },
    };
  },
};
</script>
<style  scoped>
@import url("../../../css/customer/c-contenthome.css");
</style>
    
    