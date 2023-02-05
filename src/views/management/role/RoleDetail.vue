<template>
  <div class="bk-employee-detail bk-detail">
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
        v-show="isViewMode && currentData.statusid != 2"
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
        v-show="isViewMode && currentData.statusid == 2"
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
      <div class="bk-role-common-info">
        <div class="title mt-4">Thông tin chung</div>
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
                  sm="5"
                  class="px-8"
                >
                  <v-text-field
                    label="Mã Vai trò (*)"
                    :disabled="isViewMode"
                    v-model="currentData.rolecode"
                    :rules="[rules.roleCodeRule]"
                  ></v-text-field>
                </v-col>
                <v-col sm="2"></v-col>
                <v-col
                  cols="12"
                  sm="5"
                  class="px-8"
                >
                  <v-text-field
                    label="Tên vai trò (*)"
                    :disabled="isViewMode"
                    v-model="currentData.rolename"
                    :rules="[rules.roleNameRule]"
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
                    label="Mô tả"
                    :disabled="isViewMode"
                    v-model="currentData.description"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </div>

      <div class="bk-role-permission-module">
        <div class="title">Phân quyền phân hệ</div>
      </div>

    </div>
  </div>
</template>

<script>
import FormMode from "../../../enum/FormModeEnum";
import AccountStatus from "../../../enum/AccountStatusEnum";
import { FactoryService } from "../../../service/factory/factory.service";
const EmployeeService = FactoryService.get("employeeService");
const RoleService = FactoryService.get("roleService");
const BranchService = FactoryService.get("branchService");
export default {
  name: "RoleDetail",
  data() {
    return {
      title: "Thêm vai trò",
      formMode: FormMode.Add,
      isViewMode: false,
      currentData: {},
      validForm: false,
      rules: {
        roleCodeRule: (value) => !!value || "Mã vai trò bắt buộc nhập.",
        roleNameRule: (value) => !!value || "Tên vai trò bắt buộc nhập.",
        emailMatch: [
          (v) => !!v || "E-mail bắt buộc nhập.",
          (v) => /.+@.+\..+/.test(v) || "E-mail không hợp lệ.",
        ],
      },
      listBranch: [],
      selectedBranch: null,
      accountStatus: AccountStatus.NotActive,
    };
  },
  created() {
    this.formMode = this.$route.params.formMode;
    if (this.$route.query.mode) {
      this.formMode = parseInt(this.$route.query.mode) ?? FormMode.Vỉew;
    }
    this.getAllBranch();
    this.getEmployeeInfo();
  },
  methods: {
    /**
     * Lấy danh sách toàn bộ nhân viên
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
     * Lấy dữ liệu nhân viên nếu ở form view
     */
    getEmployeeInfo() {
      const me = this;
      if (me.formMode == FormMode.Add) {
        return;
      }
      let id = this.$route.params.id;
      RoleService.getDataById(id)
        .then((result) => {
          if (result && result.data) {
            me.currentData = result.data.data;
            me.title = `Vai trò ${me.currentData.rolecode} - ${me.currentData.rolename}`;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    backToList() {
      this.$router.push({
        name: "m-employee",
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
          this.insertEmployee();
          break;
        case FormMode.Edit:
          this.updateEmployee();
          break;
        default:
          break;
      }
    },
    /**
     * thêm mới nhân viên
     */
    insertEmployee() {
      this.currentData.statusid = AccountStatus.NotActive;
      this.currentData.statustext = "Chưa kích hoạt";
      const me = this;
      EmployeeService.insertData(this.currentData).then((result) => {
        if (result && result.data) {
          if (result.data.success) {
            me.$toast.success("Thêm mới nhân viên thành công!");
            me.formMode = FormMode.View;
            me.getEmployeeInfo(result.data.data.idemployee);
          } else {
            me.$toast.error(result.data.errorMessage);
          }
        }
      });
    },
    /**
     * sửa chi nhánh
     */
    updateEmployee() {
      const me = this;
      EmployeeService.updateData(
        this.currentData,
        this.currentData?.idemployee
      ).then((result) => {
        if (result && result.data) {
          if (result.data.success) {
            me.$toast.success("Sửa chi nhánh thành công!");
            me.formMode = FormMode.View;
            me.getEmployeeInfo(result.data.data.idemployee);
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

    activeAccount() {
      const me = this;
      EmployeeService.activeAccount(this.currentData).then((result) => {
        if (result && result.data) {
          if (result.data.success) {
            me.$toast.success("Kích hoạt tài khoản thành công!");
            me.formMode = FormMode.View;
            me.getEmployeeInfo(me.currentData.idemployee);
          } else {
            me.$toast.error(result.data.errorMessage);
          }
        }
      });
    },

    deactiveAccount() {
      const me = this;
      EmployeeService.deactiveAccount(this.currentData).then((result) => {
        if (result && result.data) {
          if (result.data.success) {
            me.$toast.success("Ngừng kích hoạt tài khoản thành công!");
            me.formMode = FormMode.View;
            me.getEmployeeInfo(me.currentData.idemployee);
          } else {
            me.$toast.error(result.data.errorMessage);
          }
        }
      });
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
  },
};
</script>

<style>
</style>