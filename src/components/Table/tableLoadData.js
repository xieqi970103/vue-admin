import { reactive, ref } from '@vue/composition-api'
import { requestUrl } from '@/api/requestUrl'
import { LoadingTableData } from "@/api/common"
 
export function loadData(){
    const tableData = reactive({
        item: [],
        total: 0
    })
    const tableLoadData = (params) => {
        let requestJson = params
        let requestData = {
            url: requestUrl[requestJson.url],
            method: requestJson.method,
            data: requestJson.data 
        }
        LoadingTableData(requestData).then(response =>{ 
            let responseData = response.data.data.data

            // 后台返回数据时， 并不是返回一个数组，有时返回一个null, 统一返回的是数据，无论是否空
             
                tableData.item = responseData; 
                tableData.total = responseData.length === 0 ? 0 : response.data.data.total 
             
        })
        .catch(err =>{

        })
    }
    

    return {
        tableData, 
        tableLoadData
    }
}
/**
 *  说明业务逻辑
 * 
 * 
 * 
 *  使用方式
 * 
 *  JS目录位置：
 *      src => components => Table => tableLoadData.js
 *  JS引用方式：
 *       import { loadData } from "./tableLoadData"
 *  template:
 *      const { tableData, tableLoadData } = loadData({ root });
 *      return {
 *          tableData,
 *          tableLoadData
 *      }
 */
 
     


 