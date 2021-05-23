import Vue from 'vue';
import App from './App.vue';
import './index.css';
import * as VueGoogleMaps from "vue2-google-maps";
 
Vue.config.productionTip = false
 
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAD5s2c3UOfkAlO2KcC13UOVnP4Y8WJQ_M",
    libraries: "places" // necessary for places input
  },
  installComponents: true,
});
 
new Vue({
  render: h => h(App),
}).$mount('#app')