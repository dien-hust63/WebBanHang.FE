<template>
  <div class="bk-role-list bk-list">
    <MHeader
      :title="title"
      :subtitle="subtitle"
      addBtn='Thêm vai trò'
      @openAddForm="openAddForm"
    />
    <div class="bk-list-body">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="roleList"
        item-key="rolename"
        show-select
        hide-default-footer
        :items-per-page="pageSize"
        :page.sync="page"
        fixed-header
      >
      </v-data-table>
    </div>
    <div class="bk-list-footer bk-flex bk-flex-between">
      <v-row
        no-gutters
        style="height: 60px;"
        align-content="center"
      >
        <v-col class="bk-flex">
          <h6>
            Tổng bản ghi: {{totalPage}}
          </h6>
        </v-col>
        <v-col justify-content="center">
          <v-pagination
            v-model="page"
            :length="pageShow"
            :total-visible="pageShow"
          ></v-pagination>
        </v-col>
        <v-col>
          <v-row class="m-0 bk-paging-number">
            <v-col class="p-0"></v-col>
            <v-col class="p-0">
              <v-select
                v-model="pageSize"
                :items="itemPaging"
                label="Solo field"
                solo
                dense
                width="100"
              ></v-select>
            </v-col>

          </v-row>
        </v-col>
      </v-row>
    </div>
    <BasePopup
      :isShowPopup="isShowPopup"
      @closePopup="isShowPopup = false"
    />
  </div>
</template>
<script>
import MHeader from "../../../components/management/header/MHeader.vue";
import BasePopup from "../../../components/common/BasePopup.vue";
import { FactoryService } from "../../../service/factory/factory.service";
const RoleService = FactoryService.get("roleService");
export default {
  name: "RoleList",
  components: {
    MHeader,
    BasePopup,
  },
  data() {
    return {
      isShowPopup: false,
      maxPageShow: 7,
      pageShow: 1,
      pageSize: 10,
      page: 1,
      totalPage: 0,
      title: "Vai trò",
      subtitle:
        "Vai trò là một bộ quyền quy định mức độ truy cập phân hệ và các hoạt động. Bạn có thể thực hiện phân quyền khác nhau cho các người dùng khác nhau.",
      selected: [],
      headers: [
        {
          text: "Tên vai trò",
          align: "start",
          sortable: false,
          value: "rolename",
        },
        { text: "Mô tả vai trò", value: "description" },
      ],
      roleList: [
        {
          rolename: "Quản trị hệ thống",
          description: "Vai trò này sẽ có đầy đủ tất cả các quyền.",
        },
      ],
      itemPaging: [
        {
          text: "10 bản ghi/ trang",
          value: 10,
        },
        {
          text: "20 bản ghi/ trang",
          value: 20,
        },
        {
          text: "50 bản ghi/ trang",
          value: 50,
        },
      ],
    };
  },

  created() {
    this.getDefaultData();
  },

  methods: {
    getDefaultData() {
      const me = this;
      RoleService.getPagingData({
        PageIndex: me.PageIndex,
        PageSize: me.pageSize,
        LayoutCode: "Role",
      }).then((result) => {
        if (result && result.data) {
          me.roleList = result.data.listPaging;
          me.totalPage = result.data.total;
          me.pageShow =
            me.totalPage < me.maxPageShow
              ? Math.ceil((me.totalPage * 1.0) / me.pageSize)
              : me.maxPageShow;
        }
      });
    },

    openAddForm() {
      this.isShowPopup = true;
    },
  },
};
</script><style lang="sass" scoped>
@import url('../../../css/management/m-role.css')
</style>
  
  