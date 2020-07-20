import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js";
import { Login } from '@/api/login.js'

Vue.use(Vuex);

import app from './modules/app.js'
import login from './modules/login.js'
import common from './modules/common.js'

export default new Vuex.Store({
  modules: {
    app,
    login,
    common
  }
});
