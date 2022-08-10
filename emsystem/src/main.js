import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
//import XLSX from 'xlsx';
//import FileSaver from "file-saver";


//axios
import axios from 'axios'

Vue.prototype.$http = axios
//请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/'




Vue.config.productionTip = false

//Vue.use(XLSX);
//Vue.use(UploadExcel);
Vue.use(Avue);
//Vue.use(FileSaver);

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
