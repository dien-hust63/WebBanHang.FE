<template>
  <div class="bkc-cart">
    <div class="bkc-cart-content">
      <div class="bkc-cart-content-header">
        <div class="title">GIỎ HÀNG</div>
        <div class="count-product">(2) Sản phẩm</div>
      </div>
      <div class="bkc-cart-content-detail mt-4">
        <table class="bkc-table-cart">
          <tr>
            <th>Sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
            <th></th>
          </tr>
          <tr
            v-for="i in 3"
            :key="i"
            class="bkc-table-cart-row"
          >
            <td class="bkc-table-cart-cell">
              <div class="bkc-table-cart-product-name">
                <div class="table-cart-img">
                  <v-img src="https://nvdien.blob.core.windows.net/images/test.jpg"></v-img>
                </div>
                <div class="product-name ml-2">
                  <div class="product-name-link">Quần jeans nam Rayon phom slim siêu mềm</div>
                  <div class="product-name-color-size">Màu sắc: Trắng</div>
                  <div class="product-name-color-size">Size: XL</div>
                </div>
              </div>
            </td>
            <td class="bkc-table-cart-cell"><b>529000đ</b></td>
            <td class="bkc-table-cart-cell">
              <ButtonQuantity />
            </td>
            <td class="bkc-table-cart-cell"><b class="red--text">529000đ</b></td>
            <td>
              <div>
                <v-icon class="delete-icon">mdi-delete</v-icon>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="bkc-cart-total">
      <div class="bkc-cart-total-price">
        <div><b>Tổng đơn hàng (Tạm tính):</b></div>
        <div><b class="red--text">529000đ</b></div>
      </div>
      <div class="btn-order">
        <v-btn
          tile
          color="#fbac14"
          width="100%"
          height="100%"
          class="white--text"
          @click="redirectOrderPage"
        >
          Đặt hàng
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonQuantity from "../../common/ButtonQuantity.vue";
export default {
  name: "CCart",
  components: {
    ButtonQuantity,
  },
  data() {
    return {};
  },
  methods: {
    redirectOrderPage() {
      this.$router.push({
        name: "c-checkout",
      });
    },
  },
};
</script>
  <style  scoped>
@import url("../../../css/customer/c-cart.css");
</style>
      
      