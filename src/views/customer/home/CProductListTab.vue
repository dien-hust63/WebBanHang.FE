<template>
  <div class="bkc-productlisttab">
    <div
      class="product-category-item"
      @click="chooseProductCategory(item)"
      v-for="(item, index) in productcategoryList"
      :key="index"
    >
      <div class="main-category mb-3">{{ item.parent.productcategoryname }}</div>
      <div class="sub-category">
        <div
          class="sub-category-item"
          v-for="(child, i) in item.child"
          :key="i"
        >
          <v-icon class="m-0 p-0">mdi mdi-chevron-right</v-icon>{{ child.productcategoryname }}
        </div>
      </div>
    </div>
  </div>
</template>
    <script>
export default {
  name: "CProductListTab",
  data() {
    return {};
  },
  props: {
    productcategoryList: Array,
  },

  methods: {
    chooseProductCategory(item) {
      console.log(item);
    },
  },
};
</script>
  <style  scoped>
@import url("../../../css/customer/c-productlisttab.css");
</style>
      
      