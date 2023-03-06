<template>
  <div class="bk-product-detail bk-detail">
    <v-toolbar
      flat
      class="bk-detail-toolbar"
    >
      <v-btn
        icon
        class="hidden-xs-only"
        @click="backToList"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>
        {{title}}
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        v-show="isViewMode"
        color="#F4F5F9"
        @click="openFormEdit"
        class="ml-4"
      >
        <v-icon left>
          mdi-pencil
        </v-icon>
        Sửa
      </v-btn>
      <v-btn
        class="ml-4"
        color="primary"
        v-show="formMode == 1 || formMode == 2"
        @click="saveData"
      >
        <v-icon left>
          mdi-content-save-plus
        </v-icon>
        Lưu
      </v-btn>
    </v-toolbar>
    <div class="bk-detail-content">
      <div class="bk-order-common-info">
        <div class="title mt-4">Thông tin mua hàng</div>
        <v-card-text>
          <v-form
            ref="form"
            v-model="validForm"
            lazy-validation
            class="order-form"
          >
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="5"
                  class="px-8"
                >
                  <v-text-field
                    label="Mã đơn hàng (*)"
                    :disabled="isViewMode"
                    v-model="currentData.ordercode"
                    :rules="[rules.orderCodeRule]"
                  ></v-text-field>
                </v-col>
                <v-col sm="2"></v-col>
                <v-col
                  cols="12"
                  sm="5"
                  class="px-8"
                >
                  <v-text-field
                    label="Ngày mua hàng (*)"
                    :disabled="isViewMode"
                    v-model="currentData.orderdate"
                    :rules="[rules.orderDateRule]"
                    type="date"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="5"
                  class="px-8"
                >
                  <v-text-field
                    label="Tên khách hàng (*)"
                    :disabled="isViewMode"
                    v-model="currentData.customername"
                    :rules="[rules.customernameRule]"
                  ></v-text-field>
                </v-col>
                <v-col sm="2"></v-col>
                <v-col
                  cols="12"
                  sm="5"
                  class="px-8"
                >
                  <v-text-field
                    label="SĐT khách hàng (*)"
                    :disabled="isViewMode"
                    v-model="currentData.customerphone"
                    :rules="[rules.customerphoneRule]"
                  ></v-text-field>
                </v-col>

              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="5"
                  class="px-8"
                >
                  <v-text-field
                    label="Email khách hàng"
                    :disabled="isViewMode"
                    v-model="currentData.customeremail"
                  ></v-text-field>
                </v-col>
                <v-col sm="2"></v-col>
                <v-col
                  cols="12"
                  sm="5"
                  class="px-8"
                >
                  <v-text-field
                    label="Ghi chú"
                    :disabled="isViewMode"
                    v-model="currentData.customerdescription"
                  ></v-text-field>
                </v-col>

              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="5"
                  class="px-8"
                >
                  <v-combobox
                    label="Hình thức mua hàng"
                    v-model="selectedOrderType"
                    item-text="text"
                    item-value="id"
                    :items="listOrderType"
                    return-object
                    :disabled="isViewMode"
                  ></v-combobox>
                </v-col>
                <v-col sm="2"></v-col>
                <v-col
                  cols="12"
                  sm="5"
                  class="px-8"
                >
                  <v-text-field
                    label="Tổng tiền"
                    :disabled="true"
                    v-model="currentData.totalprice"
                  ></v-text-field>
                </v-col>

              </v-row>
              <div
                class="order-online-area"
                v-show="selectedOrderType.id == 2"
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="5"
                    class="px-8"
                  >
                    <v-combobox
                      label="Tỉnh thành (*)"
                      v-model="selectedProvince"
                      item-text="text"
                      item-value="id"
                      :items="listProvince"
                      return-object
                      :disabled="isViewMode"
                      @change="changeProvince($event)"
                    ></v-combobox>
                  </v-col>
                  <v-col sm="2"></v-col>
                  <v-col
                    cols="12"
                    sm="5"
                    class="px-8"
                  >
                    <v-combobox
                      label="Quận huyện (*)"
                      v-model="selectedDistrict"
                      item-text="text"
                      item-value="id"
                      :items="listDistrict"
                      return-object
                      :disabled="isDisableDistrict"
                      @change="changeDistrict($event)"
                    ></v-combobox>
                  </v-col>

                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="5"
                    class="px-8"
                  >
                    <v-combobox
                      label="Phường xã (*)"
                      v-model="selectedWard"
                      item-text="text"
                      item-value="id"
                      :items="listWard"
                      return-object
                      :disabled="isDisableWard"
                      @change="changeWard($event)"
                    ></v-combobox>
                  </v-col>
                  <v-col sm="2"></v-col>
                  <v-col
                    cols="12"
                    sm="5"
                    class="px-8"
                  >
                    <v-text-field
                      label="Địa chỉ cụ thể"
                      :disabled="isViewMode"
                      v-model="currentData.customeraddress"
                    ></v-text-field>
                  </v-col>

                </v-row>

                <v-row>
                  <v-col
                    cols="12"
                    sm="5"
                    class="px-8"
                  >
                    <v-combobox
                      label="Hình thức thanh toán"
                      v-model="selectedCheckoutType"
                      item-text="text"
                      item-value="id"
                      :items="listCheckoutType"
                      return-object
                      :disabled="isViewMode"
                    ></v-combobox>
                  </v-col>
                  <v-col sm="2"></v-col>
                  <v-col
                    cols="12"
                    sm="5"
                    class="px-8"
                  >
                    <v-combobox
                      label="Trạng thái thanh toán"
                      v-model="checkoutStatus"
                      item-text="text"
                      item-value="id"
                      :items="listCheckoutStatus"
                      return-object
                      :disabled="isViewMode"
                    ></v-combobox>
                  </v-col>

                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="5"
                    class="px-8"
                  >
                    <v-combobox
                      label="Trạng thái đơn hàng"
                      v-model="selectedOrderStatus"
                      item-text="text"
                      item-value="id"
                      :items="listOrderStatus"
                      return-object
                      :disabled="isViewMode"
                      @change="changeOrderStatus($event)"
                    ></v-combobox>
                  </v-col>
                </v-row>

              </div>

            </v-container>
          </v-form>
        </v-card-text>
      </div>
      <div class="bk-order-other-info">
        <div class="title mt-4">Thông tin khác</div>
        <v-card-text>
          <v-form
            ref="form"
            v-model="validForm"
            lazy-validation
            class="order-form"
          >
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="5"
                  class="px-8"
                >
                  <v-text-field
                    label="Nhân viên bán hàng"
                    :disabled="true"
                    v-model="currentData.receiveemployeename"
                  ></v-text-field>
                </v-col>
                <v-col sm="2"></v-col>
                <v-col
                  cols="12"
                  sm="5"
                  class="px-8"
                >
                  <v-text-field
                    label="Chi nhánh"
                    :disabled="true"
                    v-model="currentData.branchname"
                  ></v-text-field>
                </v-col>
              </v-row>

            </v-container>
          </v-form>
        </v-card-text>
      </div>
      <div class="bk-order-other-detail-info">
        <div class="title mt-4">Thông tin hàng hóa</div>
        <table
          class="bkc-table-product-detail-instance mt-4"
          v-show="listProductDetail.length > 0"
        >
          <tr class="bkc-table-cart-header">
            <th>Tên</th>
            <th>Mã hàng</th>
            <th>Kích thước</th>
            <th>Màu sắc</th>
            <th>Giá bán</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th></th>
          </tr>
          <tr
            v-for="(item, index) in listProductDetail"
            :key="index"
            class="bkc-table-cart-row"
          >
            <td class="bkc-table-cart-cell">
              {{item.productname}}
            </td>
            <td class="bkc-table-cart-cell">{{item.productcode}}</td>
            <td class="bkc-table-cart-cell">
              <v-text-field
                variant="underlined"
                v-model="item.costprice"
                type="number"
                :disabled="isViewMode"
              ></v-text-field>
            </td>
            <td class="bkc-table-cart-cell">
              <v-text-field
                variant="underlined"
                v-model="item.sellprice"
                type="number"
                :disabled="isViewMode"
              ></v-text-field>
            </td>
            <td class="bkc-table-cart-cell">
              <v-text-field
                variant="underlined"
                v-model="item.inventory"
                type="number"
                :disabled="isViewMode"
              ></v-text-field>
            </td>
            <td>
              <div>
                <v-icon
                  class="delete-icon"
                  @click="removeProductItem(index)"
                >mdi-delete</v-icon>
              </div>
            </td>
          </tr>
        </table>
        <v-btn
          class="mt-4"
          @click="openPopupProduct()"
          :disabled="isViewMode"
        >Thêm hàng hóa</v-btn>
      </div>
      <div class="bk-order-deliver-info">
        <div class="title mt-4">Thông tin giao hàng</div>
        <v-card-text>
          <v-form
            ref="form"
            v-model="validForm"
            lazy-validation
            class="order-form"
          >
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="5"
                  class="px-8"
                >
                  <v-text-field
                    label="Phí giao hàng"
                    :disabled="true"
                    v-model="currentData.deliverprice"
                  ></v-text-field>
                </v-col>
                <v-col sm="2"></v-col>
              </v-row>

            </v-container>
          </v-form>
        </v-card-text>
      </div>
    </div>
    <ProductPopup
      :isShowPopup="isShowProductPopup"
      @close="closeProductPopup"
    />
  </div>
</template>

<script>
import FormMode from "../../../enum/FormModeEnum";
import AccountStatus from "../../../enum/AccountStatusEnum";
import { FactoryService } from "../../../service/factory/factory.service";
import { AZURE_STORAGE_BASE_URL } from "../../../config/config.dev.json";
import ProductPopup from "../product/ProductPopup.vue";
const ProductService = FactoryService.get("productService");
const BranchService = FactoryService.get("branchService");
const LocationService = FactoryService.get("locationService");
const DeliverService = FactoryService.get("deliverService");
const ProductCategoryService = FactoryService.get("productcategoryService");
const AuthService = FactoryService.get("authService");
export default {
  name: "OrderDetail",
  components: { ProductPopup },
  data() {
    return {
      listPermissionInModule: "",
      selectedProvince: null,
      listProvince: [],
      isDisableDistrict: true,
      listDistrict: [],
      selectedDistrict: null,
      listWard: [],
      selectedWard: null,
      isDisableWard: true,
      isShowProductPopup: false,
      titlePopup: "Danh sách hàng hóa",
      testImg: "",
      listOrderType: [
        {
          id: 1,
          text: "Mua trực tiếp tại chi nhánh",
        },
        {
          id: 2,
          text: "Mua online",
        },
      ],
      listCheckoutType: [
        {
          id: 1,
          text: "Thanh toán qua VNPAY",
        },
        {
          id: 2,
          text: "Thanh toán khi nhận hàng",
        },
      ],
      listCheckoutStatus: [
        {
          id: 1,
          text: "Đã thanh toán",
        },
        {
          id: 2,
          text: "Chưa thanh toán",
        },
      ],
      selectedCheckoutType: {
        id: 2,
        text: "Thanh toán khi nhận hàng",
      },
      checkoutStatus: {
        id: 2,
        text: "Chưa thanh toán",
      },
      selectedOrderStatus: {
        id: 1,
        text: "Hoàn thành",
      },
      listOrderStatus: [],
      listImageInColor: [],
      listProductDetail: [],
      listColorSelected: [],
      isShowGroupInstance: false,
      isShowGroupAttribute: false,
      title: "Thêm đơn hàng",
      formMode: FormMode.Add,
      isViewMode: false,
      currentData: {},
      validForm: false,
      rules: {
        orderCodeRule: (value) => !!value || "Mã đơn hàng bắt buộc nhập.",
        orderDateRule: (value) => !!value || "Ngày mua hàng bắt buộc nhập.",
        customernameRule: (value) => !!value || "Tên khách hàng bắt buộc nhập.",
        customerphoneRule: (value) =>
          !!value || "SĐT khách hàng bắt buộc nhập.",
        emailMatch: [
          (v) => !!v || "E-mail bắt buộc nhập.",
          (v) => /.+@.+\..+/.test(v) || "E-mail không hợp lệ.",
        ],
      },
      listBranch: [],
      selectedBranch: null,
      mainImageLink: "",
      listProductCategory: [],
      selectedProductCategory: null,
      accountStatus: AccountStatus.NotActive,
      isOpenInventory: false,
      validInventoryForm: false,
      listSize: ["XS", "S", "M", "L", "XL", "XXL"],
      listColor: [
        "Đen",
        "Trắng",
        "Tím",
        "Hồng",
        "Đỏ",
        "Vàng",
        "Cam",
        "Nâu",
        "Xám",
        "Be",
        "Xanh lá cây",
        "Xanh dương",
      ],
      listSizeSelected: [],
      selectedColor: "",
      listFiles: [],
      selectedOrderType: {
        id: 1,
        text: "Mua trực tiếp tại chi nhánh",
      },
      isShowPopup: false,
    };
  },
  created() {
    this.formMode = this.$route.params.formMode;
    if (this.$route.query.mode) {
      this.formMode = parseInt(this.$route.query.mode) ?? FormMode.Vỉew;
    }
    //this.getAllBranch();
    this.getAllProductCategory();
    this.getDetailInfo();
    this.getAllProvince();
    const me = this;
    let user = JSON.parse(localStorage.getItem("user"));
    AuthService.getPermission(user.userInfo).then((result) => {
      if (result && result.data) {
        let listPermissionClone = [...result.data.data];
        me.listPermissionInModule = listPermissionClone.find(
          (x) => x.modulecode == "Order"
        ).permission;
      }
    });
  },
  methods: {
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
    changeWard(ward) {
      if (ward && this.selectedProvince && this.selectedDistrict) {
        const me = this;
        let param = {
          from_district_id: this.defaultBranch.districtid,
          service_type_id: 2,
          to_district_id: this.selectedDistrict["id"],
          to_ward_code: this.selectedWard["id"],
          height: 5,
          length: 30,
          weight: 20,
          width: 20,
          insurance_value: this.totalPrice,
          coupon: null,
        };
        // gọi lấy thông tin vận chuyển
        DeliverService.getDeliverPrice(param)
          .then((result) => {
            if (result) {
              me.deliverPrice = result.data.data.service_fee;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.deliverPrice = null;
      }
    },
    changeProvince(province) {
      const me = this;
      me.selectedDistrict = null;
      me.selectedWard = null;
      me.deliverPrice = null;
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
      me.selectedWard = null;
      me.deliverPrice = null;
      LocationService.getWardByDistrict(district.id)
        .then((result) => {
          if (result && result.data) {
            me.isDisableWard = false;
            me.listWard = result.data.data.map((x) => ({
              id: x.WardCode,
              text: x.WardName,
            }));
            console.log(me.listWard);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    closeProductPopup() {
      this.isShowProductPopup = false;
    },
    openPopupProduct() {
      this.isShowProductPopup = true;
    },
    removeProductItem(index) {
      this.listProductDetail.splice(index, 1);
    },
    removeColor(index) {
      this.listColorSelected.splice(index, 1);
    },
    /**
     * Thêm 1 màu sắc
     */
    insertColorAttribute() {
      this.listColorSelected.push({
        color: "",
      });
    },
    /**
     * Lấy danh sách toàn bộ chi nháh
     */
    getAllBranch() {
      const me = this;
      BranchService.getAllData()
        .then((result) => {
          if (result && result.data) {
            me.listBranch = result.data.data.map((x) => ({
              value: x.idbranch,
              text: x.branchname,
            }));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    openProductInvetoryPopup() {
      this.isOpenInventory = true;
    },
    closeInventoryPopup() {
      this.isOpenInventory = false;
    },
    saveInventory() {},
    /**
     * Lấy danh sách toàn bộ nhóm hàng hoas
     */
    getAllProductCategory() {
      const me = this;
      ProductCategoryService.getAllData()
        .then((result) => {
          if (result && result.data) {
            me.listProductCategory = result.data.data
              .filter((x) => x.parentid != 0)
              .map((x) => ({
                value: x.idproductcategory,
                text: x.productcategoryname,
              }));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Lấy dữ liệu hàng hóa nếu ở form view
     */
    getDetailInfo() {
      const me = this;
      if (me.formMode == FormMode.Add) {
        return;
      }
      let id = this.$route.params.id;
      ProductService.getProductDetail(id)
        .then((result) => {
          if (result && result.data) {
            me.currentData = result.data.data.product;
            me.selectedProductCategory = {
              value: me.currentData["categoryid"],
              text: me.currentData["categoryname"],
            };
            me.mainImageLink = me.currentData["image"];
            me.listColorSelected = JSON.parse(me.currentData.color);
            me.listSizeSelected = JSON.parse(me.currentData.size);
            me.title = `${me.currentData.productcode} - ${me.currentData.productname}`;
            me.listProductDetail = [...result.data.data.productDetail];
            if (me.listProductDetail && me.listProductDetail.length > 0) {
              me.isShowGroupInstance = true;
            }
            if (me.listSizeSelected || me.listColorSelected.length > 0) {
              me.isShowGroupAttribute = true;
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    backToList() {
      this.$router.push({
        name: "m-order",
      });
    },
    openFormEdit() {
      if (
        !this.listPermissionInModule.includes("Edit") &&
        !this.listPermissionInModule.includes("All")
      ) {
        this.$toast.error("Bạn không có quyền thực hiện tính năng này.");
        return;
      }
      this.$router
        .push({
          query: { mode: FormMode.Edit },
        })
        .catch(() => {});
      this.formMode = FormMode.Edit;
      this.isViewMode = false;
    },
    /**
     * Lưu dữ liệu khi sửa hoặc thêm
     */
    saveData() {
      const me = this;
      let isValid = me.validateBeforeSave(this.currentData);
      if (!isValid) {
        return;
      }
      this.prepareDataBeforeSave();
      switch (me.formMode) {
        case FormMode.Add:
          this.insertData();
          break;
        case FormMode.Edit:
          this.updateData();
          break;
        default:
          break;
      }
    },
    /**
     * Làm chuẩn dữ liệu trước khi lưu
     */
    prepareDataBeforeSave() {
      let listFieldToInt = ["costprice", "sellprice", "inventory"];
      listFieldToInt.forEach((element) => {
        if (this.currentData[element] && this.currentData[element] != "") {
          this.currentData[element] = parseInt(this.currentData[element]);
        }
        this.listProductDetail.forEach((detail) => {
          if (detail[element] && detail[element] != "") {
            detail[element] = parseInt(detail[element]);
          }
        });
      });
      let listColorSelectedClone = [...this.listColorSelected];
      if (this.listImageInColor.length > 0) {
        listColorSelectedClone.forEach((element) => {
          element["image"] = this.listImageInColor.find(
            (x) => x.color == element.color
          )?.image;
        });
      }
      this.currentData["color"] = JSON.stringify(listColorSelectedClone);
      this.currentData["size"] = JSON.stringify(this.listSizeSelected);
    },
    /**
     * thay đổi image chính
     */
    changeMainImage(file) {
      if (file) {
        let fileClone = this.renameFile(file, `${Date.now()}`);
        this.currentData[
          "image"
        ] = `${AZURE_STORAGE_BASE_URL}${fileClone.name}`;
        this.listFiles.push(fileClone);
      }
    },
    renameFile(originalFile, newName) {
      return new File([originalFile], newName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
      });
    },
    /**
     * thay đổi image list color
     */
    changeColorImage(file, item) {
      if (file) {
        let fileClone = this.renameFile(file, `${Date.now()}`);
        this.listImageInColor.push({
          color: item.color,
          image: `${AZURE_STORAGE_BASE_URL}${fileClone.name}`,
        });

        this.listFiles.push(fileClone);
      }
    },
    /**
     * thêm mới hàng hóa
     */
    insertData() {
      let productParam = new FormData();
      productParam.append("product", JSON.stringify(this.currentData));
      productParam.append(
        "productdetail",
        JSON.stringify(this.listProductDetail)
      );
      for (let i = 0; i < this.listFiles.length; i++) {
        productParam.append("file", this.listFiles[i], this.listFiles[i].name);
      }
      const me = this;
      ProductService.insertProductDetail(productParam).then((result) => {
        if (result && result.data) {
          if (result.data.success) {
            me.$toast.success("Thêm mới hàng hóa thành công!");
            me.formMode = FormMode.View;
            me.listSizeSelected = JSON.parse(result.data.data.size);
            me.listColorSelected = JSON.parse(result.data.data.color);
            this.$router.push({
              name: "m-product-detail",
              params: { id: result.data.data["idproduct"], formMode: 3 },
            });
          } else {
            me.$toast.error(result.data.errorMessage);
          }
        }
      });
    },
    /**
     * sửa hàng hóa
     */
    updateData() {
      let productParam = new FormData();
      productParam.append("product", JSON.stringify(this.currentData));
      productParam.append(
        "productdetail",
        JSON.stringify(this.listProductDetail)
      );
      for (let i = 0; i < this.listFiles.length; i++) {
        productParam.append("file", this.listFiles[i], this.listFiles[i].name);
      }
      const me = this;
      ProductService.updateProductDetail(productParam).then((result) => {
        if (result && result.data) {
          if (result.data.success) {
            me.$toast.success("Sửa hàng hóa thành công!");
            me.formMode = FormMode.View;
            me.listSizeSelected = JSON.parse(result.data.data.size);
            me.listColorSelected = JSON.parse(result.data.data.color);
            this.$router.push({
              name: "m-product-detail",
              params: { id: result.data.data["idproduct"], formMode: 3 },
            });
          } else {
            me.$toast.error(result.data.errorMessage);
          }
        }
      });
    },
    /**
     * Kiểm tra dữ liệu trước khi lưu
     */
    validateBeforeSave(dataSave) {
      this.$refs.form.validate();
      if (
        !this.validForm ||
        !dataSave ||
        (dataSave && Object.keys(dataSave).length === 0)
      ) {
        return false;
      }
      return true;
    },
  },
  watch: {
    selectedCheckoutType: {
      handler: function (val) {
        if (val) {
          this.currentData["checkouttypeid"] = val["value"];
          this.currentData["checkouttypename"] = val["text"];
        }
      },
      deep: true,
    },
    checkoutStatus: {
      handler: function (val) {
        if (val) {
          this.currentData["checkoutstatusid"] = val["value"];
          this.currentData["checkoutstatusname"] = val["text"];
        }
      },
      deep: true,
    },
    formMode(val) {
      if (!val || (val && val == 3)) {
        this.isViewMode = true;
      }
    },
    selectedBranch: {
      handler: function (val) {
        if (val) {
          this.currentData["branchid"] = val["value"];
          this.currentData["branchname"] = val["text"];
        }
      },
      deep: true,
    },
    selectedProductCategory: {
      handler: function (val) {
        if (val) {
          this.currentData["categoryid"] = val["value"];
          this.currentData["categoryname"] = val["text"];
        }
      },
      deep: true,
    },
    selectedOrderType: {
      handler: function (val) {
        if (val) {
          this.currentData["ordertypeid"] = val["value"];
          this.currentData["ordertypename"] = val["text"];
        }
      },
      deep: true,
    },

    totalInventory(val) {
      this.currentData["inventory"] = val;
    },
  },
  computed: {
    totalInventory() {
      let total = 0;
      this.listProductDetail.forEach((x) => {
        if (x && x["inventory"] && x["inventory"] != "") {
          total += parseInt(x["inventory"]);
        }
      });

      return total;
    },
  },
};
</script>

<style scroped>
@import url("../../../css/management/m-productdetail.css");
</style>