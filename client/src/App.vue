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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

ul {
  list-style: none;
}
</style>
