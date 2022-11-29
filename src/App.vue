<template>
  <div>
    <div v-if="isManagement">
      <ManagementApp />
    </div>
    <div v-if="!isManagement">
      <CustomerApp />
    </div>
  </div>
</template>

<script>
import CustomerApp from "./CustomerApp.vue";
import ManagementApp from "./ManagementApp.vue";
export default {
  name: "App",

  components: {
    CustomerApp,
    ManagementApp,
  },

  data: () => ({
    isManagement: false,
  }),
  created() {
    if (window.location.pathname.toLocaleLowerCase().includes("management")) {
      this.isManagement = true;
    } else {
      this.isManagement = false;
    }
  },
};
</script>
