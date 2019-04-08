<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="secondary">
              <v-toolbar-title>Signup Form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  color="primary"
                  prepend-icon="email"
                  name="email"
                  label="Email"
                  type="email"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  id="alias"
                  prepend-icon="person"
                  name="alias"
                  label="Alias"
                  type="text"
                  v-model="alias"
                  :rules="aliasRules"
                  required
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="!valid" color="secondary" @click="signup">Signup</v-btn>
            </v-card-actions>
          </v-card>
          <v-alert :value="feedback" type="error" transition="scale-transition">{{feedback}}</v-alert>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      aliasRules: [v => !!v || "Alias is required"],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 6) || "Password must be at least 6 characters"
      ],
      feedback: null,
      valid: true,
      slug: null
    };
  },
  methods: {
    signup() {
      if (this.$refs.form.validate()) {
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+%.()'"!`|\-:;@]/g,
          lower: true
        });
        let ref = db.collection("users").doc(this.slug);
        ref
          .get()
          .then(doc => {
            if (doc.exists) {
              this.feedback = "This alias already exists";
            } else {
              firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                  ref
                    .set({
                      alias: this.alias,
                      geolocation: null,
                      user_id: cred.user.uid
                    })
                    .then(() => {
                      this.$router.push({ name: "GMap" });
                    })
                    .catch();
                })
                .catch(err => {
                  this.feedback = err.message;
                });
              this.feedback = "This alias is free to use";
            }
          })
          .catch();
      }
    }
  }
};
</script>
<style>
</style>
