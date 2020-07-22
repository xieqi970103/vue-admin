import { GetCategory } from '@/api/news.js'
const state = {
  qiniuUrl : 'http://qdtrkjkud.bkt.clouddn.com/'
}
const getters = {
  qiniuUrl : state => state.qiniuUrl
}
const actions= {
        getInfoCategory(content, requestData){
        return new Promise((resolve, reject) =>{
          //接口
          GetCategory({}).then((request) => {
            resolve(request)
          }).catch(erroe =>{
            reject(erroe)
          })
        })
        }
}

export default {
      namespaced: true,
      actions,
      state,
      getters
}