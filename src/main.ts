import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";
import "popper.js";
import "bootstrap";
import "./assets/app.scss";

declare global {
  interface Window { 
      $:any; 
      jQuery:any; 
  }
}

window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false;

Vue.component("Navbar", require("./components/NavBar.vue").default);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
