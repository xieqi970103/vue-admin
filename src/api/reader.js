import service from "@/utils/request"
/**
 * 删除读者
 */
export function DeleteReader(data){
    return service.request({
        method: "post",
        url: "/deleteReader/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}

/**
 * 新增读者 
 */
export function AddReader(data){
    return service.request({
        method: "post",
        url: "/addReader/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}

/**
 * 读者数量readerCount
 */ 
export function GetReaderCount(data){
    return service.request({
        method: "post",
        url: "getReaderCount/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
} 
/**
 * 读者访问量
 */ 
export function GetReaderFlux(data){
    return service.request({
        method: "post",
        url: "getReaderFlux/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}