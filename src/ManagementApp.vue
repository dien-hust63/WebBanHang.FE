<template>
  <div>
    <v-app>
      <SideBar />
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import SideBar from "./components/management/layout/SideBar.vue";
export default {
  name: "ManagementApp",

  components: {
    SideBar,
  },

  data: () => ({
    //
  }),
  created() {},
};
</script>
