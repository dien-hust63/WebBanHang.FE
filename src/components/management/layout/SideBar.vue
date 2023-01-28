<template>
  <div class="bk-management-sidebar">
    <v-navigation-drawer
      v-model="drawer"
      permanent
      color="#F4F5F9"
      app
    >
      <v-list-item class="px-2 pt-5">
        <v-list-item-title
          class="text-capitalize"
          align="center"
        >
          <v-avatar
            class="d-block text-center mx-auto mt-4 mb-10"
            size="120"
          >
            <v-img src="https://nvdien.blob.core.windows.net/images/360formen.png"></v-img>
          </v-avatar>
        </v-list-item-title>
      </v-list-item>
      <v-divider dark="true"></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="deep-purple"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="handleMenuClick(item.name)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            :value="false"
            prepend-icon="mdi-package-variant-closed"
            color="deep-purple"
          >
            <template v-slot:activator>
              <v-list-item-title>Hàng hóa</v-list-item-title>
            </template>

            <v-list-item
              v-for="([title, icon,name], i) in listProducts"
              :key="i"
              link
              @click="handleMenuClick(name)"
            >
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="title"></v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-group
            :value="false"
            prepend-icon="fas fa-cog"
            color="deep-purple"
          >
            <template v-slot:activator>
              <v-list-item-title>Thiết lập</v-list-item-title>
            </template>
            <v-list-item
              v-for="([title, icon,name], i) in settings"
              :key="i"
              link
              @click="handleMenuClick(name)"
            >
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="title"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data: () => ({
    selectedItem: 0,
    drawer: null,
    items: [
      {
        icon: "mdi-finance",
        text: "Tổng quan",
        route: "/report",
        name: "m-report",
      },
      {
        icon: "mdi-cart-variant",
        text: "Đơn hàng",
        route: "/order",
        name: "m-order",
      },
      {
        icon: "mdi-account-group",
        text: "Khách hàng",
        route: "/customer",
        name: "m-customer",
      },
      {
        icon: "mdi-home-circle-outline",
        text: "Khuyến mãi",
        route: "/promotion",
        name: "m-promotion",
      },
    ],
    listProducts: [
      ["Danh mục", "", "m-product"],
      ["Nhóm hàng hóa", "", "m-productcategory"],
      ["Thiết lập giá", "", "m-role"],
    ],
    settings: [
      ["Chi nhánh", "", "m-branch"],
      ["Nhân viên", "", "m-employee"],
      ["Vai trò", "", "m-role"],
    ],
  }),
  methods: {
    handleMenuClick(name) {
      this.$router
        .push({
          name: name,
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
div >>> .v-list a {
  text-decoration: none;
}
</style>