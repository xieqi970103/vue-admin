import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from '@vue/composition-api';
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./router/premit"; 
//自定义全局方法
//import global from "@/utils/global.js"
// 引入按钮权限
import { buttonPermission } from "./utils/buttonPermission"

//自定义全局组件
import "./icons/index.js"

import VCharts from 'v-charts'
Vue.use(VCharts)


Vue.prototype.btnPerm = buttonPermission // Vue.prototype.方法名称 
Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(ElementUI);
//Vue.use(global);


// 自定义指令
Vue.directive("btnPerm",{
  bind:function(el, bingind, vnode){
    el.style["color"] = bingind.value
    console.log("1-bind")
  },
  inserted:function(){
    console.log("2-inserted")
  },
  update:function(){
    console.log("3-update")
  },
  componentUpdated:function(){
    console.log("4-componentUpdated")
  },
  unbind:function(){
    console.log("5-unbind")
  }
})



//runtime (运行模式)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
