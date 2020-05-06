import Vue from 'vue'
import App from './App'
import uView from "@/uview";
import MinRequest from '@/common/MinRequest'
import minRequest from '@/common/api'
Vue.config.productionTip = false
//全局过滤器
import * as filters from 'common/commonFilter.js'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
App.mpType = 'app'
Vue.use(MinRequest)
Vue.use(uView);
const app = new Vue({
    ...App,
    minRequest
})
app.$mount()


// http拦截器
import httpInterceptor from '@/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)
