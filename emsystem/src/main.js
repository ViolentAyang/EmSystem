import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//axios
import axios from 'axios'

Vue.prototype.$http = axios
//请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/'

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
