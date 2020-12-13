import service from "@/utils/request"
/**
 * 驳回请求 
 */
export function refuseApply(data){
    return service.request({
        method: "post",
        url: "/refuseApply/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 * 同意请求affirmApply
 */
export function affirmApply(data){
    return service.request({
        method: "post",
        url: "affirmApply/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 * 获取待办消息数
 */
export function GetMessageCount(data){
    return service.request({
        method: "post",
        url: "getMessageCount/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}