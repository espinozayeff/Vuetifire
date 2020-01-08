import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyBUiat7_QZjevyFtC6szdTSj5yujL3_6vM",
  authDomain: "crud-vuetify-firestore.firebaseapp.com",
  databaseURL: "https://crud-vuetify-firestore.firebaseio.com",
  projectId: "crud-vuetify-firestore",
  storageBucket: "crud-vuetify-firestore.appspot.com",
  messagingSenderId: "985557780009",
  appId: "1:985557780009:web:003fea8e316e5a08d17e38"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
