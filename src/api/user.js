import service from "@/utils/request"
/**
 * 列表
 */
export function GetList(data){
    return service.request({
        method: "post",
        url: "/user/getList/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 * 角色
 */
export function GetRole(data = {}){
    return service.request({
        method: "post",
        url: "/role/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 * 添加用户
 */
export function UserAdd(data = {}){
    return service.request({
        method: "post",
        url: "/user/add/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 * 删除用户
 */
export function UserDelete(data = {}){
    return service.request({
        method: "post",
        url: "/user/delete/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 * 用户禁用启用
 */
export function UserActives(data){
    return service.request({
        method: "post",
        url: "/user/actives/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 * 用户编辑
 */
export function UserEdit(data){
    return service.request({
        method: "post",
        url: "/user/edit/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 * 系统列表
 */
export function GetSystem(data){
    return service.request({
        method: "post",
        url: "/system/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 * 按钮权限
 */
export function GetPermButton(data){
    return service.request({
        method: "post",
        url: "/permButton/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}