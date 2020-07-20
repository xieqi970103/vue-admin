import { GetCategory } from '@/api/news.js'
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
                actions
            }