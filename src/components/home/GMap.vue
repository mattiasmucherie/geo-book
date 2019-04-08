<template>
  <v-content>
    <div class="google-map" id="map"></div>
  </v-content>
</template>
<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "Gmap",
  data() {
    return {
      lat: 70.31522,
      lng: 58.03184
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 13,
        streetViewControl: false
      });
      db.collection("users")
        .get()
        .then(users => {
          users.docs.forEach(doc => {
            let data = doc.data();
            if (data.geolocation) {
              let marker = new google.maps.Marker({
                map: map,
                position: {
                  lat: data.geolocation.lat,
                  lng: data.geolocation.lng
                },
                title: data.alias
              });
              // add click event to marker
              marker.addListener("click", () => {
                console.log(doc.id);
              });
            }
          });
        });
    }
  },
  mounted() {
    // get current user
    let user = firebase.auth().currentUser;

    // get user geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.lng = pos.coords.longitude;
          this.lat = pos.coords.latitude;

          //find the user record and then update geocords
          db.collection("users")
            .where("user_id", "==", user.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                db.collection("users")
                  .doc(doc.id)
                  .update({
                    geolocation: {
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude
                    }
                  });
              });
            })
            .then(() => {
              this.renderMap();
            });
        },
        err => {
          console.log(err);
          this.renderMap();
        },
        { maximumAge: 60000, timeout: 3000 }
      );
    } else {
      // posistion center by default values
      this.renderMap();
    }
  }
};
</script>
<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

