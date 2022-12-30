<template>
  <Header />
  <Devices />
</template>

<script>
//composables
// components
import Devices from "./components/Devices.vue";
import Header from "./components/Header.vue";
export default {
  name: "App",
  components: { Devices, Header },
  setup() {
    return {};
  },
};
</script>

<style></style>
