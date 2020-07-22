const state = {
  id: "" || sessionStorage.getItem('infoId'),
  title: "" || sessionStorage.getItem('infoTitle'),
}
const getters = { //computed
  infoId: state => state.id,
  infoTitle: state => state.title
}
const mutations = { //同步 没有回调
  UPDATE_STATE_VALUE(state, params){
    for(let key in params) {
      state[key] = params[key] 
      //是否存储session
      if(params[key].session){
        sessionStorage.setItem(params[key].sessionKey, params[key].val) 
      }
    }


  },

  // SET_ID(state, value){
  //   state.id = value
  //   //html5本地存储
  //   sessionStorage.setItem('infoId', JSON.stringify(value)) 
  // },
  // SET_TITLE(state, value){
  //   state.title = value
  //    //html5本地存储
  //    sessionStorage.setItem('infoTitle', JSON.stringify(value)) 
  // }
}
export default {
      namespaced: true,
      state,
      getters,
      mutations
};