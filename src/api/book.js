import service from "@/utils/request"
/**
 * 删除图书
 */
export function DeleteBook(data){
    return service.request({
        method: "post",
        url: "/deleteBook/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}

/**
 * 新增图书
 */
export function AddBook(data){
    return service.request({
        method: "post",
        url: "/addBook/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**G
 *  获取图书分类
 */
export function GetBookType(data){
    return service.request({
        method: "post",
        url: "/getBookType/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}