<template>
  <v-content>
    <div class="google-map" id="map"></div>
  </v-content>
</template>
<script>
export default {
  name: "Gmap",
  data() {
    return {
      lat: 59.31522,
      lng: 18.03184
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 10,
        streetViewControl: false
      });
    }
  },
  mounted() {
    this.renderMap();
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

