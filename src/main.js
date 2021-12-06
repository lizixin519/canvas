/*
 * @Author: your name
 * @Date: 2021-12-01 17:12:21
 * @LastEditTime: 2021-12-02 10:30:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /canvas/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
