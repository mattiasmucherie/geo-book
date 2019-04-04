<template>
  <v-app>
    <Navbar/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from "./components/layout/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      //
    };
  }
};
</script>
