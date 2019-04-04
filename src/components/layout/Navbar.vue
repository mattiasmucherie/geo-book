<template>
  <nav>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="headline text-uppercase white--text">
        <span class="font-weight-medium">Geo</span>
        <span class="font-weight-light">Book</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Signup</v-btn>
        <v-btn flat>Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>
