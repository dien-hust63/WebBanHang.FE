<template>
  <div class="bkc-checkout">
    <div class="bkc-checkout-user-info">
      <div class="checkout-avatar">
        <v-avatar
          class="d-block text-center mx-auto mt-4 mb-10"
          size="120"
        >
          <v-img src="https://nvdien.blob.core.windows.net/images/360formen.png"></v-img>
        </v-avatar>
      </div>
      <div class="checkout-user-deliver">
        <div class="checkout-user-content">
          <div class="title">
            Thông tin giao hàng
          </div>
          <v-form
            ref="form"
            v-model="validForm"
            lazy-validation
            class="user-form"
          >
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Họ và tên"
                    required
                    :rules="[rules.fullNameRule]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Số điện thoại"
                    :rules="[rules.phonenumberRule]"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Ghi chú"
                    persistent-hint
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-combobox
                    label="Tỉnh thành"
                    v-model="selectedProvince"
                    item-text="text"
                    item-value="id"
                    :items="listProvince"
                    return-object
                    outlined
                    dense
                    @change="changeProvince($event)"
                  ></v-combobox>
                </v-col>
                <v-col cols="12">
                  <v-combobox
                    label="Quận huyện"
                    v-model="selectedDistrict"
                    item-text="text"
                    item-value="id"
                    :items="listDistrict"
                    return-object
                    outlined
                    dense
                    :disabled="isDisableDistrict"
                    @change="changeDistrict($event)"
                  ></v-combobox>
                </v-col>
                <v-col cols="12">
                  <v-combobox
                    label="Phường xã"
                    v-model="selectedWard"
                    item-text="text"
                    item-value="id"
                    :items="listWard"
                    return-object
                    outlined
                    dense
                    :disabled="isDisableWard"
                    @change="changeWard($event)"
                  ></v-combobox>
                </v-col>

              </v-row>
            </v-container>
          </v-form>
        </div>
        <div class="checkout-deliver-payment">
          <div class="deliver-cost">
            <div class="title">Vận chuyển</div>
            <div class="deliver-cost-content">
              <div class="deliver-cost-text">Phí vận chuyển</div>
              <div class="deliver-cost-price">20000đ</div>
            </div>
          </div>
          <div class="payment-method">
            <div class="title">Thanh toán</div>
            <div class="payment-radio-group">

              <v-radio-group v-model="radios">
                <v-radio
                  label="	Thanh toán qua thẻ thanh toán, ứng dụng ngân hàng VNPAY"
                  value="1"
                ></v-radio>
                <v-radio
                  label="Thanh toán khi nhận hàng (COD)"
                  value="2"
                ></v-radio>
              </v-radio-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bkc-checkout-order-info">
      <div class="title">Đơn hàng (1 sản phẩm)</div>
      <div class="bkc-checkout-order-product-list">

        <div
          class="cart-mini-body-item"
          v-for="i in 3"
          :key="i"
        >
          <div class="cart-mini-item-image">
            <v-img src="https://nvdien.blob.core.windows.net/images/test.jpg"></v-img>
            <div class="quantity-total">
              1
            </div>
          </div>
          <div class="cart-mini-item-content pl-3">
            <div class="cart-mini-item-content-left">

              <div class="mini-item-name">
                <div class="mini-item-product-name">Quần jeans nam Rayon phom slim siêu mềm</div>
              </div>

              <div class="mini-item-color-size">Màu sắc: Trắng, Size: 30</div>

            </div>
            <div class="mini-item-price ml-4">529000đ</div>
          </div>
        </div>
      </div>
      <div class="checkout-price-total mt-4">
        <div class="checkout-deliver-price">
          <div class="text">Phí vận chuyển</div>
          <div class="price">20000đ</div>
        </div>
        <div class="checkout-order-total mt-2">
          <div class="text">Tổng cộng</div>
          <div class="price-total">379000đ</div>
        </div>
      </div>
      <div class="checkout-order-info-footer mt-4">
        <div
          class="back-to-cart"
          @click="returnCartPage"
        >
          <i class="fas fa-chevron-left"></i>
          Quay về giỏ hàng
        </div>
        <div class="btn-order-checkout">
          <v-btn
            tile
            color="#fbac14"
            width="100%"
            height="100%"
            class="white--text"
            @click="orderProduct"
          >
            Đặt hàng
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FactoryService } from "../../../service/factory/factory.service";
const LocationService = FactoryService.get("locationService");
export default {
  name: "CCheckout",
  created() {
    this.getAllProvince();
  },
  data() {
    return {
      rules: {
        fullNameRule: (value) => !!value || "Vui lòng nhập họ tên",
        phonenumberRule: (value) => !!value || "Vui lòng nhập số điện thoại",
      },
      radios: "",
      selectedProvince: null,
      listProvince: [],
      isDisableDistrict: true,
      listDistrict: [],
      selectedDistrict: null,
      listWard: [],
      selectedWard: null,
      isDisableWard: true,
    };
  },
  methods: {
    orderProduct() {},
    /**
     * Lấy danh sách các tỉnh
     */
    getAllProvince() {
      const me = this;

      LocationService.getListProvince()
        .then((result) => {
          if (result && result.data) {
            me.listProvince = result.data.data.map((x) => ({
              id: x.ProvinceID,
              text: x.ProvinceName,
            }));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    changeProvince(province) {
      const me = this;
      LocationService.getDistrictByProvince(province.id)
        .then((result) => {
          if (result && result.data) {
            me.isDisableDistrict = false;
            me.listDistrict = result.data.data.map((x) => ({
              id: x.DistrictID,
              text: x.DistrictName,
            }));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    changeDistrict(district) {
      const me = this;
      LocationService.getWardByDistrict(district.id)
        .then((result) => {
          if (result && result.data) {
            me.isDisableWard = false;
            me.listWard = result.data.data.map((x) => ({
              id: x.WardID,
              text: x.WardName,
            }));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    returnCartPage() {
      this.$router.push({
        name: "c-cart",
      });
    },
  },
};
</script>

<style scoped>
@import url("../../../css/customer/c-checkout.css");
</style>