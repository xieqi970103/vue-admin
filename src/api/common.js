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
export function QiniuToKen(data){
    return service.request({
        method: "post",
        url: "/uploadImgToken/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}