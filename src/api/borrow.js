import service from "@/utils/request"
/**
 * 删除图书
 */
export function DeleteBorrow(data){ 
    return service.request({
        method: "post",
        url: "/deleteBorrow/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}

 