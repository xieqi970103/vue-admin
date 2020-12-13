import { Login } from '@/api/login.js'
import { setToKen,  setUserName, getUserName, removeToKen, removeUserName} from '@/utils/app.js'
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  to_Ken: '',
  username: getUserName() || '', 
  roles: [],
  buttonPermission: [],
  message_count: 999
}
const getters = { //computed
  isCollapse: state => state.isCollapse, 
  buttonPermission: state => state.buttonPermission,  
  roles: state => state.roles,
  to_Ken: state => state.to_Ken,
  message_count: state => state.message_count,
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
  SET_ROLES(state, value){
    state.roles = value  
  },
  SET_BUTTON(state, value){
    state.buttonPermission = value 
  },
  SET_MESSAGE_COUNT(state, value){
    state.message_count = value 
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
      commit("SET_ROLES", '')
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