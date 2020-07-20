import { MessageBox, Message } from 'element-ui';
// VUE3.0
import { reactive, ref} from '@vue/composition-api'
import { GetCategory } from '@/api/news.js'
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