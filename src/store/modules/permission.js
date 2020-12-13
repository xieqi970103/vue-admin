 import { GetUserRole } from "@/api/login"
 import {asnycRouterMap, defaultRouterMap} from "@/router/index"
function hasPermission(roles, router) { 
    if(router.meta && router.meta.role) { 
        // console.log(roles)
        // console.log(router.meta)
        // console.log(router.meta.role)
        return roles.some(item => router.meta.role.indexOf(item) >= 0)
    }

    // indexOf 对大小写敏感
}
const state = { 
  allRouters: defaultRouterMap,
  addRouters: [],
}
const getters = { //computed  
    allRouters: state => state.allRouters, // 所有的路由
    addRouters: state => state.addRouters, // 匹配的路由
}
const mutations = { //同步 没有回调 
   SET_ROUTER(state, router){
        state.addRouters = router
        state.allRouters = defaultRouterMap.concat(router) 
   }
}
const actions = { //可以回调处理
    /**
     * 获取用户角色
     * @param {*} param0 
     * @param {*} requestData 
     */
    getRoules({ commit }, requestData) { 
        return new Promise((resole, reject) => {
             
        GetUserRole().then(response => {  
            let role = response.data.data; 
            resole(role)

        })
        })
    },
  /**
   * 创建动态路由
   */
    createRouter({ commit }, data){
        return new Promise((resole, reject) => {
            let role = data; 
            const addRouters = asnycRouterMap.filter(item => {
                // ES6 includes 匹配数组是否有需要的值 
                if(role == "admin"){ //超管状态
                    return item
                }
                console.log(role)
                
                if(hasPermission(role, item)){ 
                    
                    //优先判断
                    if(item.children && item.children.length > 0){
                        item.children = item.children.filter(child => {
                            if(hasPermission(role, child)){
                                return child
                            }
                        })
                        return item
                    }
                    return item
                }

                          
            })
            // 更新路由
            commit('SET_ROUTER', addRouters)
            resole()
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