<template>
  <div class="m-header">
    <div class="m-header-title mb-4">
      <h3>{{title}}</h3>
      <div class="sub-title">{{subtitle}}</div>
    </div>
    <div class="m-header-toolbar bk-flex bk-flex-between">
      <div class="left-section bk-flex bk-flex-start">
        <!-- search input -->
        <div class="form-group has-search m-header-search">
          <span class="fa fa-search form-control-feedback"></span>
          <input
            type="text"
            class="form-control"
            :placeholder="searchTitle"
            v-on:keyup.enter="onSearch"
            v-model="searchValue"
          >
        </div>
      </div>
      <div class="right-section bk-flex-end">
        <v-dialog
          v-model="deleteConfigDialog"
          persistent
          max-width="360"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="error"
              v-bind="attrs"
              v-on="on"
              v-show="isShowDelete"
              class="mr-4"
              depressed
            >
              {{ deleteBtn }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h6">
              Bạn có chắc muốn xóa dữ liệu đã chọn?
            </v-card-title>
            <!-- <v-card-text>Bạn có chắc muốn xóa những dữ liệu đã chọn?</v-card-text> -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="deleteConfigDialog = false">
                Hủy
              </v-btn>
              <v-btn
                depressed
                color="error"
                @click="deleteData"
              >
                Xóa
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn
          color="primary"
          @click="openAddForm()"
        >
          <v-icon left>
            fas fa-plus
          </v-icon>
          {{ addBtn }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mheader",
  data() {
    return {
      deleteConfigDialog: false,
      searchValue: "",
    };
  },
  props: {
    title: String,
    subtitle: String,
    addBtn: String,
    isShowDelete: Boolean,
    deleteBtn: String,
    searchTitle: String,
  },
  methods: {
    openAddForm() {
      this.$emit("openAddForm");
    },
    deleteData() {
      this.$emit("deleteData");
    },
    onSearch() {
      this.$emit("onSearch", this.searchValue);
    },
  },
  watch: {
    isShowDelete(val) {
      if (!val) {
        this.deleteConfigDialog = false;
      }
    },
  },
};
</script>

<style scoped>
@import url("../../../css/management/m-header.css");
</style>