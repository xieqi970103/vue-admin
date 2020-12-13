import { MessageBox, Message } from 'element-ui';
// VUE3.0
import { reactive, ref} from '@vue/composition-api'
import { GetCategory } from '@/api/news.js'
import service from "@/utils/request"
export function common(){
    const str = ref('')
    const category = reactive({
        item:[]
    });
    const getInfoCategory = (params) => {
        GetCategoryAll({}).then(response =>{
            category.item = response.data.data.data
        }).catch(error => {

        })
    }
    return {
        getInfoCategory,
        category,
    }

}

//获取七牛云token
/**
 * @param {
 *  AK: 七牛云的密钥AK type: String 
 *  SK: 七牛云的密钥SK type: String 
 *  buckety: 七牛云的存储空间名称 type: String 
 * } params
 */
export function QiniuToKen(data){
    return service.request({
        method: "post",
        url: "/uploadImgToken/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
 
/**
 * 请求表格数据
 */
export function LoadingTableData(params){
    return service.request({
        method: params.method,
        url: params.url || "",
        data: params.data  || {}
    })
}


/**
 * 获取省市区街关联
 * 
 * @param {
    *   
    * } params
    */

export function GetCityPicker(data){
    return service.request({
        method: "post",
        url: "/cityPicker/" || "",
        data
    })
}