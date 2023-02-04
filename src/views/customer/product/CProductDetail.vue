<template>
  <div class="bkc-product-detail">
    <div class="product-detail-content">
      <div class="product-detail-left">
        <v-img src="https://nvdien.blob.core.windows.net/images/test.jpg"></v-img>
      </div>
      <div class="product-detail-right">
        <div class="product-name">{{product.productname}}</div>
        <div class="product-price">{{product.sellprice}}</div>
        <div class="product-color">
          <div class="product-color-text"><b>Màu sắc:</b> {{currentColorPick.color}}</div>
          <div class="product-color-image">
            <div
              class="product-color-image-item"
              v-for="(item,index) in productColorList"
              :key="index"
              @click="pickColor(item)"
              :class="{'product-color-image-item--active':item.color == currentColorPick.color}"
            >
              <v-img :src="item.image"></v-img>
            </div>
          </div>
        </div>
        <div class="product-size">
          <div class="product-size-title">Cỡ:</div>
          <div class="product-size-list">
            <div
              class="product-size-list-item"
              v-for="(item,index) in productSizeList"
              :key="index"
              @click="pickSize(item)"
              :class="{'product-size-list-item--active':item.size == currentSizePick.size}"
            >
              {{ item.size }}
            </div>
          </div>
        </div>
        <div class="product-quantity">
          <ButtonQuantity />

        </div>
        <div class="btn-add-card">
          <v-btn
            tile
            color="#fbac14"
            width="100%"
            height="100%"
            class="white--text"
            @click=addProductToCart()
          >
            <v-icon left>
              mdi mdi-cart-minus
            </v-icon>
            <b>Thêm vào giỏ hàng</b>
          </v-btn>
        </div>
        <div class="product-description">
          <div class="product-description-title"><b>Mô tả</b></div>
          <div class="product-description-content">
            <p v-html="product.description"></p>

          </div>
        </div>
      </div>
    </div>
    <div class="product-list-relate">
      <div class="c-product-area">
        <div class="c-product-area-title">
          SẢN PHẨM LIÊN QUAN
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
  </div>
</template>

            <script>
import ButtonQuantity from "../../common/ButtonQuantity.vue";
import CProductCard from "../productcard/ProductCard.vue";
export default {
  name: "CProductDetail",
  components: {
    ButtonQuantity,
    CProductCard,
  },
  data() {
    return {
      product: {
        mainimage: "https://nvdien.blob.core.windows.net/images/test.jpg",
        productname: "Áo khoác nam AKHTK305",
        sellprice: "949.000",
        description:
          "– Chất liệu: Da lộn (100% Poly) – Dáng: REGULAR<br />– Màu: BE, ĐEN<br />– Size: M – L – XL<br />– Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống<br />",
      },
      productColorList: [
        {
          image: "https://nvdien.blob.core.windows.net/images/test.jpg",
          color: "Trắng",
        },
        {
          image:
            "https://nvdien.blob.core.windows.net/images/ADLTK304-QJDTK324-2.jpg",
          color: "Đen",
        },
      ],
      currentColorPick: {},
      productSizeList: [
        {
          id: 1,
          size: "XL",
        },
        {
          id: 2,
          size: "M",
        },
        {
          id: 3,
          size: "L",
        },
      ],
      currentSizePick: {},
    };
  },
  created() {
    this.currentColorPick = this.productColorList[0];
    this.currentSizePick = this.productSizeList[0];
  },
  methods: {
    viewDetailProduct() {
      this.$router.push({
        name: "c-product-detail",
      });
    },
    pickColor(item) {
      this.currentColorPick = item;
    },
    pickSize(item) {
      this.currentSizePick = item;
    },
    addProductToCart() {
      this.$store.commit("cart/addProductToCart", {});
    },
  },
};
</script>
    <style  scoped>
@import url("../../../css/customer/c-productdetail.css");
</style>
            
            