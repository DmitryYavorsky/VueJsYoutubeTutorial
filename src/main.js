import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate"
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import messagePlugin from "@/common/message.plugin";
import dateFilter from "@/filters/date.filter.js";
import currencyFilter from "@/filters/currency.filter.js";
import tooltipDirective from "@/directives/tooltip.directive";
import "materialize-css/dist/js/materialize.min";
import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import Loader from '@/components/app/Loader';



Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);


const firebaseConfig = {
  apiKey: "AIzaSyCKbZd-6UkvBFN0564epwyO9grtNXKhypw",
  authDomain: "vuetutorial-5e9b6.firebaseapp.com",
  databaseURL: "https://vuetutorial-5e9b6.firebaseio.com",
  projectId: "vuetutorial-5e9b6",
  storageBucket: "vuetutorial-5e9b6.appspot.com",
  messagingSenderId: "849907540149",
  appId: "1:849907540149:web:033ddd16cbe9c5c7121efc",
  measurementId: "G-BV5BV2QE7S"
};
firebase.initializeApp(firebaseConfig);

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});





