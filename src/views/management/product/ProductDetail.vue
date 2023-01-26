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
      <!-- <v-btn
        v-show="isViewMode"
        color="success"
        @click="activeAccount"
        class="ml-4"
      >
        <v-icon left>
          mdi-package-variant-closed-check
        </v-icon>
        Kích hoạt
      </v-btn>
      <v-btn
        v-show="isViewMode"
        color="error"
        @click="deactiveAccount"
        class="ml-4"
      >
        <v-icon left>
          mdi-block-helper
        </v-icon>
        Ngừng kích hoạt
      </v-btn> -->
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
      <v-card-text>
        <v-form
          ref="form"
          v-model="validForm"
          lazy-validation
          class="role-form"
        >
          <v-container>
            <v-row>

              <v-col
                cols="12"
                sm="6"
                class="px-8"
              >
                <v-col
                  cols="12"
                  class="px-8"
                >
                  <v-text-field
                    label="Mã hàng hóa (*)"
                    :disabled="isViewMode"
                    v-model="currentData.productcode"
                    :rules="[rules.productCodeRule]"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  class="px-8"
                >
                  <v-text-field
                    label="Tên hàng hóa (*)"
                    :disabled="isViewMode"
                    v-model="currentData.productname"
                    :rules="[rules.productNameRule]"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  class="px-8"
                >
                  <v-combobox
                    label="Nhóm hàng hóa"
                    v-model="selectedProductCategory"
                    item-text="text"
                    item-value="value"
                    :items="listProductCategory"
                    return-object
                    :disabled="isViewMode"
                  ></v-combobox>
                </v-col>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="px-16"
              >
                <image-upload ref="imageUpload" />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </div>
  </div>
</template>

<script>
import FormMode from "../../../enum/FormModeEnum";
import AccountStatus from "../../../enum/AccountStatusEnum";
import ImageUpload from "../../common/ImageUpload.vue";
import { FactoryService } from "../../../service/factory/factory.service";
const ProductService = FactoryService.get("productService");
const BranchService = FactoryService.get("branchService");
const ProductCategoryService = FactoryService.get("productcategoryService");
export default {
  name: "ProductDetail",
  components: {
    ImageUpload,
  },
  data() {
    return {
      title: "Thêm hàng hóa",
      formMode: FormMode.Add,
      isViewMode: false,
      currentData: {},
      validForm: false,
      rules: {
        productCodeRule: (value) => !!value || "Mã hàng hóa bắt buộc nhập.",
        productNameRule: (value) => !!value || "Tên hàng hóa bắt buộc nhập.",
        emailMatch: [
          (v) => !!v || "E-mail bắt buộc nhập.",
          (v) => /.+@.+\..+/.test(v) || "E-mail không hợp lệ.",
        ],
      },
      listBranch: [],
      selectedBranch: null,

      listProductCategory: [],
      selectedProductCategory: null,
      accountStatus: AccountStatus.NotActive,
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
  },
  methods: {
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
      ProductService.getDataById(id)
        .then((result) => {
          if (result && result.data) {
            me.currentData = result.data.data;
            me.title = `${me.currentData.productcode} - ${me.currentData.productname}`;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    backToList() {
      this.$router.push({
        name: "m-product",
      });
    },
    openFormEdit() {
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
     * thêm mới hàng hóa
     */
    insertData() {
      let a = this.$refs.imageUpload;
      let imageProduct = new FormData();
      imageProduct.append("mainImage", a.newImageRaw, a.newImageRaw.name);
      imageProduct.append("productcode", this.currentData.productcode);
      imageProduct.append("productname", this.currentData.productname);
      imageProduct.append("categoryid", this.currentData.categoryid);
      imageProduct.append("categoryname", this.currentData.categoryname);
      const me = this;
      ProductService.insertProduct(imageProduct).then((result) => {
        if (result && result.data) {
          if (result.data.success) {
            me.$toast.success("Thêm mới hàng hóa thành công!");
            me.$refs.imageUpload = result.data.data.me.formMode = FormMode.View;
            me.getDetailInfo(result.data.data.idproduct);
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
      const me = this;
      ProductService.updateData(
        this.currentData,
        this.currentData?.idproduct
      ).then((result) => {
        if (result && result.data) {
          if (result.data.success) {
            me.$toast.success("Sửa hàng hóa thành công!");
            me.formMode = FormMode.View;
            me.getDetailInfo(result.data.data.idproduct);
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
  },
};
</script>

<style>
</style>