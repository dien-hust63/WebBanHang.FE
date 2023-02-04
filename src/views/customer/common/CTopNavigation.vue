<template>
  <div class="bkc-top-navigation">
    <div class="c-nav-header">
      <div class="c-nav-header-left">
        <v-img src="https://nvdien.blob.core.windows.net/images/360formen.png"></v-img>
      </div>
      <div class="c-nav-header-center">
        <!-- search input -->
        <div class="form-group has-search m-header-search">
          <span class="fa fa-search fa-2xl form-control-feedback"></span>
          <input
            type="text"
            class="form-control"
            placeholder="Tìm kiếm sản phẩm..."
            v-on:keyup.enter="onSearch"
            v-model="searchValue"
          >
        </div>
      </div>
      <div class="c-nav-header-right">
        <div class="ml-4 c-nav-header-right-icon c-nav-header-right-icon-cart">
          <v-icon
            large
            @click="showCartMini()"
          >
            mdi mdi-cart-minus
          </v-icon>
          <div
            class="c-nav-cart-minus-count"
            @click="showCartMini()"
          >
            {{ $store.state.cart.totalCartItem }}
          </div>
          <div
            class="c-nav-cart-mini-content"
            v-show="isShowCartMini"
          >
            <div class="cart-mini-content-header">
              <div class="title">Giỏ hàng</div>
              <div
                class="close"
                @click="isShowCartMini = false"
              >
                <v-icon size="30px">mdi-close</v-icon>
              </div>
            </div>
            <div class="cart-mini-content-body ">
              <div
                class="cart-mini-body-item"
                v-for="i in 4"
                :key="i"
              >
                <div class="cart-mini-item-image">
                  <v-img src="https://nvdien.blob.core.windows.net/images/test.jpg"></v-img>
                </div>
                <div class="cart-mini-item-content pl-3">
                  <div class="mini-item-name">
                    <div class="mini-item-product-name">Quần jeans nam Rayon phom slim siêu mềm</div>
                    <div class="delete-icon">
                      <v-icon size="24px">mdi-delete</v-icon>
                    </div>
                  </div>
                  <div class="mini-item-price"><b class="red--text">529000đ</b></div>
                  <div class="mini-item-color-size">Màu sắc: Trắng, Size: 30</div>
                  <div class="quantity-total">
                    <ButtonQuantity />
                    <div class="item-total">
                      <div>
                        Tổng cộng: <b class="red--text">529000đ</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cart-mini-content-footer">
              <div class="footer-total mt-2">Tổng cộng: <b class="red--text">529000đ</b></div>
              <div class="btn-view-cart">
                <v-btn
                  tile
                  color="#fbac14"
                  width="100%"
                  height="100%"
                  class="white--text"
                  @click="viewCartDetail"
                >
                  Xem giỏ hàng
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="ml-4 c-nav-header-right-icon mr-2">
          <v-icon large>
            mdi mdi-account-circle
          </v-icon>
        </div>
      </div>
    </div>
    <div
      class="c-nav-tab"
      @focusout="handleFocusOut"
      tabindex="0"
    >
      <div
        class="c-nav-tab-item c-nav-tab-product"
        :class="{'c-nav-tab-product--active':isShowProductTab}"
        @click="isShowProductTab = !isShowProductTab"
      >
        <div>Sản phẩm</div>

      </div>
      <div
        class="c-nav-tab-item"
        @click="showListBranch"
        @mouseover="isShowProductTab = false"
      >Hệ thống cửa hàng</div>
      <v-expand-transition>
        <div
          class="c-nav-product-category"
          v-show="isShowProductTab"
        >
          <CProductListTab :productcategoryList="productcategoryList" />
        </div>
      </v-expand-transition>
    </div>
  </div>
</template>
      <script>
import CProductListTab from "../home/CProductListTab.vue";
import { FactoryService } from "../../../service/factory/factory.service";
import ButtonQuantity from "../../common/ButtonQuantity.vue";
const ProductCategoryService = FactoryService.get("productcategoryService");
export default {
  name: "CTopNavigation",
  components: {
    CProductListTab,
    ButtonQuantity,
  },
  created() {
    this.getCategoryList();
    console.log(this.$store);
  },
  data() {
    return {
      searchValue: "",
      isShowProductTab: false,
      productcategoryList: [],
      isShowCartMini: false,
    };
  },
  methods: {
    onSearch() {},
    handleFocusOut() {
      this.isShowProductTab = false;
    },
    showListBranch() {
      this.isShowProductTab = false;
    },
    showCartMini() {
      this.isShowCartMini = !this.isShowCartMini;
    },
    getCategoryList() {
      const me = this;
      ProductCategoryService.getAllData()
        .then((result) => {
          if (result && result.data) {
            let listCategory = result.data.data;
            let parentList = listCategory.filter((x) => x.parentid == 0);
            me.productcategoryList = [];
            parentList.forEach((item) => {
              let childCategory = listCategory.filter(
                (x) => x.parentid == item.idproductcategory
              );
              me.productcategoryList.push({
                parent: item,
                child: childCategory,
              });
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    viewCartDetail() {
      this.isShowCartMini = false;
      this.$router.push({
        name: "c-cart",
      });
    },
  },
};
</script>
<style  scoped>
@import url("../../../css/customer/c-topnavigation.css");
</style>
      
      