import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: "#673ab7",
    secondary: "#607d8b",
    accent: "#ff5722",
    error: "#f44336",
    warning: "#ffc107",
    info: "#03a9f4",
    success: "#4caf50"
  }
});
