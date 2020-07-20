import { Login } from '@/api/login.js'
const login = {
      state: {},
      getters: {},
      mutations: {},
      actions: {
        login(content, requestData){
          return new Promise((resolve, reject) =>{
            //接口
            Login(requestData).then((request) => {
              resolve(request)
            }).catch(erroe =>{
              reject(erroe)
            })
          })
        }
      },
}

 export default login;