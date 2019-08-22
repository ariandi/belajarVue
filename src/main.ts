import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";
import "popper.js";
import "bootstrap";
import "./assets/app.scss";
import { fb } from "./firebase";

declare global {
  interface Window { 
      $:any; 
      jQuery:any; 
  }
}

window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false;

Vue.component("Navbar", require("./components/NavBar.vue").default);


let app = '';

fb.auth().onAuthStateChanged(function(user) {
  if(!app){
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app"); 
  }
});