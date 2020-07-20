import service from "@/utils/request"
/**
 * 列表
 */
export function GetList(data){
    return service.request({
        method: "post",
        url: "	/news/getList/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**Info
* 新增信息
*/
export function AddInfo(data){
    return service.request({
        method: "post",
        url: "	/news/add/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}


/**
* 编辑
*/
export function EditInfo(data){
    return service.request({
        method: "post",
        url: "/news/editInfo/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
* 删除
*/
export function DeleteInfo(data){
    return service.request({
        method: "post",
        url: "/news/deleteInfo/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 * 一级分类添加
 */

export function AddFirstCategory(data){
    return service.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 *  获取全部分类
 */
export function GetCategoryAll(data){
    return service.request({
        method: "post",
        url: "/news/getCategoryAll/ ",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 *  获取分类
 */
export function GetCategory(data){
    return service.request({
        method: "post",
        url: "/news/getCategory/ ",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}

/**
 * 删除分类
 */

export function DeleteCategory(data){
    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 * 修改分类
 */

export function EditCategory(data){
    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 * 添加子集
 */
export function AddChildrenCategory(data){
    return service.request({
        method: "post",
        url: "/news/addChildrenCategory/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}