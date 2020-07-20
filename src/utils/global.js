  import { MessageBox, Message } from 'element-ui';
// export default {
//     install (Vue, options){
//         Vue.prototype.confirm = (params) => {
//             MessageBox.confirm(params.content,  params.tip || "提示", {
//                 confirmButtonText: '确定',
//                 cancelButtonText: '取消',
//                 type: params.type || 'warning',
//                 center: true
//               }).then(() => {
//                 if(params.fn){
//                     params.fn()
//                 }
//                 Message({
//                   type: 'success',
//                   message: '删除成功!'
//                 });
//               }).catch(() => {
//                 Message({
//                   type: 'info',
//                   message: '已取消删除'
//                 });
//               });
//         }
//     }
// }

// // vue插件

// VUE3.0
import { reactive, ref} from '@vue/composition-api'
export function global(){
    const str = ref('')
    const confirm = (params) => {
        MessageBox.confirm(params.content,  params.tip || "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: params.type || 'warning',
            center: true
            }).then(() => {
                str.value = params.id || '',
                params.fn && params.fn(params.id || '')
                 
                Message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch( err => {
                params.catchfn && params.catchfn(params.id || '')
                Message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
    }
    return {
        confirm
    }

}