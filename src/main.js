import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Axios from "axios";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from "vue2-google-maps";
import Snotify, { SnotifyPosition } from "vue-snotify";

Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = "http://localhost:8081/LyricLibs_CI/index.php";
Vue.prototype.$apiUrl2 = "http://localhost:8081/LyricLibs_CI/index.php/";
Vue.prototype.$apiUrl3 = "http://localhost:8081/LyricLibs_CI/index.php/";
Vue.prototype.$apiUrl4 = "http://localhost:8081/KouveePetShop_CI/index.php/";
Vue.prototype.$apiUrl5 = "http://localhost:8081/KouveePetShop_CI/uploads/";
// Vue.prototype.$apiUrl5 = "http://127.0.0.1:8000/api/";

Vue.use(VueGoogleMaps, {
  load: { key: "AIzaSyBLUR1h1gAQCqeSVV_JvPBBE1DoXFtdg4U" },
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  VueGoogleMaps,
  vuetify,
  Snotify,
  components: { App },
}).$mount("#app");
