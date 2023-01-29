<template>
  <div class="bkc-content-home">
    <v-carousel
      :show-arrows="false"
      height="800px"
      cycle
    >
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>

  </div>
</template>
  <script>
export default {
  name: "CContentHome",
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
    };
  },
};
</script>
<style  scoped>
@import url("../../../css/customer/c-contenthome.css");
</style>
    
    