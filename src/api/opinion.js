import service from "@/utils/request"
/**
 * submit
 */
export function SubmitFeedback(data){
    return service.request({
        method: "post",
        url: "/submitFeedback/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
 