<template>
  <div class="bkc-main-content-home">
    <v-carousel
      :show-arrows="false"
      height="calc(100vh - 170px)"
      cycle
    >
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
    <div class="c-product-area">
      <div class="c-product-area-title">
        SẢN PHẨM BÁN CHẠY
      </div>
      <div class="c-product-area-content">
        <v-row justify="center">
          <v-col
            v-for="n in 12"
            :key="n"
            cols="12"
            sm="6"
            xs="6"
            md="3"
            class="px-4"
          >
            <div
              class="c-product-area-item"
              @click="viewDetailProduct"
            >
              <CProductCard :product="product" />
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
    <script>
import CProductCard from "../productcard/ProductCard.vue";
export default {
  name: "CMainHome",
  components: {
    CProductCard,
  },
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
  methods: {
    viewDetailProduct() {
      this.$router.push({
        name: "c-product-detail",
      });
    },
  },
};
</script>
  <style  scoped>
@import url("../../../css/customer/c-contenthome.css");
</style>
      
      