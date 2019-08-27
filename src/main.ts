import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";
import "popper.js";
import "bootstrap";
import Swal from 'sweetalert2';
import "./assets/app.scss";
const VueFirestore = require('vue-firestore');
import { fb } from "./firebase";

declare global {
  interface Window { 
      $:any; 
      jQuery:any;
      Swal:any;
  }
}

window.$ = window.jQuery = jQuery;
window.Swal = Swal;

Vue.config.productionTip = false;
Vue.use(VueFirestore)

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