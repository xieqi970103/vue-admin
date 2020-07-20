import { Login } from '@/api/login.js'
import { setToKen,  setUserName, getUserName, removeToKen, removeUserName} from '@/utils/app.js'
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  to_Ken: '',
  username: getUserName() || '',
}
const getters = { //computed
  isCollapse: state => state.isCollapse,
}
const mutations = { //同步 没有回调
  SET_COLLAPSE(state){
    state.isCollapse = !state.isCollapse;
    //html5本地存储
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  },
  SET_TOKEN(state, value){
    state.to_Ken = value
  },
  SET_USERNAME(state, value){
    state.username = value
  },
}
const actions = { //可以回调处理
  login({ commit }, requestData){
    return new Promise((resolve, reject) =>{
      //接口
      Login(requestData).then((response) => {
        let data = response.data.data
        // token 、username
        commit('SET_TOKEN', data.token)
        commit('SET_USERNAME', data.username)

        setToKen(data.token)
        setUserName(data.username)

        resolve(response)
      }).catch(erroe =>{
        reject(erroe)
      })
    })
  },
  exit({ commit }){
    return new Promise((resolve, reject) => {
      removeToKen()
      removeUserName()
      commit("SET_TOKEN", '')
      commit("SET_USERNAME", '')
      resolve();
    })
    

  }
}
 export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
 }