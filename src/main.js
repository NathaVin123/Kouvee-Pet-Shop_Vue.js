import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from "vue2-google-maps";

Vue.prototype.$http = Axios;
<<<<<<< HEAD
Vue.prototype.$apiUrl = 'http://localhost/LyricLibs_CI/index.php';
Vue.prototype.$apiUrl2 = "http://localhost/LyricLibs_CI/index.php/";
Vue.prototype.$apiUrl3 = "http://localhost/LyricLibs_CI/index.php/";
Vue.prototype.$apiUrl4 = "http://localhost/KouveePetShop_CI/index.php/";
=======
Vue.prototype.$apiUrl = 'http://localhost:8081/LyricLibs_CI/index.php';
Vue.prototype.$apiUrl2 = "http://localhost:8081/LyricLibs_CI/index.php/";
Vue.prototype.$apiUrl3 = "http://localhost:8081/LyricLibs_CI/index.php/";
Vue.prototype.$apiUrl4 = "http://localhost:8081/KouveePetShop_CI/index.php/";
>>>>>>> b88af1aa6c14006a042e4e9e7c28b06c0e49b1b0
// Vue.prototype.$apiUrl5 = "http://127.0.0.1:8000/api/";

Vue.use(VueGoogleMaps, {
  load: { key: "AIzaSyBLUR1h1gAQCqeSVV_JvPBBE1DoXFtdg4U" }
});

Vue.config.productionTip = false
new Vue({
  router,
  VueGoogleMaps,
  vuetify,
  render: h => h(App)
}).$mount('#app')