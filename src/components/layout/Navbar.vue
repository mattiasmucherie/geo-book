<template>
  <nav>
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase primary--text">
              <router-link class="toolbar-title" to="/">
                <span class="font-weight-medium">Geo</span>
                <span class="font-weight-light">Book</span>
              </router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile v-if="user" color="secondary">
          <v-list-tile-content>
            <v-list-tile-title>{{user.email}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/signup" v-if="!user">
          <v-list-tile-content>
            <v-list-tile-title>Signup</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/login" v-if="!user">
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout" v-if="user">
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark color="primary">
      <v-toolbar-title class="headline text-uppercase white--text">
        <router-link class="toolbar-title" to="/">
          <span class="font-weight-medium">Geo</span>
          <span class="font-weight-light">Book</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-chip v-if="user" class="ma-2" color="secondary">
          <v-icon>account_circle</v-icon>
          {{user.email}}
        </v-chip>
        <v-btn flat to="/signup" v-if="!user">Signup</v-btn>
        <v-btn flat to="/login" v-if="!user">Login</v-btn>
        <v-btn flat @click="logout" v-if="user">Logout</v-btn>
      </v-toolbar-items>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
  </nav>
</template>
<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      drawer: null,
      user: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch();
    }
  },
  created() {
    // let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>
<style>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>
