<template>
  <div class="bkc-product-detail">
    <div class="product-detail-content">
      <div class="product-detail-left">
        <v-img :src="mainImage"></v-img>
      </div>
      <div class="product-detail-right">
        <div class="product-name">{{product.productname}}</div>
        <div class="product-price">{{product.sellprice}} (VNĐ)</div>
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
              :class="{'product-size-list-item--active':item == currentSizePick}"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="product-quantity">
          <ButtonQuantity
            :quantityVal="quantityChosen"
            @changeQuantity="changeQuantity"
          />

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
            <pre v-html="product.description"></pre>
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
import { FactoryService } from "../../../service/factory/factory.service";
const ProductService = FactoryService.get("productService");
export default {
  name: "CProductDetail",
  components: {
    ButtonQuantity,
    CProductCard,
  },
  data() {
    return {
      quantityChosen: 1,
      mainImage: "",
      product: {},
      productColorList: [],
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
      currentSizePick: "",
      listProductDetail: [],
      chosenproduct: {},
    };
  },
  created() {
    this.getProductDetail();
  },
  methods: {
    changeQuantity(quantity) {
      if (quantity && quantity != "") {
        this.quantityChosen = parseInt(quantity);
        this.chosenproduct["quantity"] = quantity;
      }
    },
    getProductDetail() {
      const me = this;
      let id = this.$route.params.id;
      ProductService.getProductDetail(id).then((result) => {
        if (result && result.data) {
          me.product = result.data.data.product;
          me.chosenproduct = { ...me.product };
          me.chosenproduct["quantity"] = 1;
          me.mainImage = me.product["image"];
          me.productColorList = JSON.parse(me.product["color"]);
          me.productSizeList = JSON.parse(me.product["size"]);
          me.listProductDetail = result.data.data.productDetail;
          if (me.productColorList && me.productColorList.length > 0) {
            me.currentColorPick = me.productColorList[0];
            me.chosenproduct["color"] = me.currentColorPick.color;
          }
          if (me.productSizeList && me.productSizeList.length > 0) {
            me.currentSizePick = me.productSizeList[0];
            me.chosenproduct["size"] = me.currentSizePick;
          }
        }
      });
    },
    viewDetailProduct() {
      this.$router.push({
        name: "c-product-detail",
      });
    },
    pickColor(item) {
      this.currentColorPick = item;
      this.mainImage = item.image;
      this.chosenproduct["image"] = item.image;
      this.chosenproduct["color"] = item.color;
    },
    pickSize(item) {
      this.currentSizePick = item;
      this.chosenproduct["size"] = item;
    },
    addProductToCart() {
      this.$store.commit("cart/addProductToCart", this.chosenproduct);
    },
  },
};
</script>
    <style  scoped>
@import url("../../../css/customer/c-productdetail.css");
</style>
            
            