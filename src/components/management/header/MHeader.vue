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
            placeholder="Search"
          >
        </div>
      </div>
      <div class="right-section bk-flex-end">
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
    return {};
  },
  props: {
    title: String,
    subtitle: String,
    addBtn: String,
  },
  methods: {
    openAddForm() {
      this.$emit("openAddForm");
    },
  },
};
</script>

<style scoped>
@import url("../../../css/management/m-header.css");
</style>