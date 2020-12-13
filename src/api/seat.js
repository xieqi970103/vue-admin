import service from "@/utils/request"
 
export function GetSeatList(data){
    return service.request({
        method: "post",
        url: "getSeatList/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 * 获取上座率
 */
export function GetSeatCount(data){
    return service.request({
        method: "post",
        url: "getSeatCount/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}