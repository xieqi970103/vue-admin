import service from "@/utils/request"
/**
 * 获取验证码
 */
export function GetSms(data){
    return service.request({
        method: "post",
        url: "/getSms/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}


/**
* 获取用户角色
*/ 


/**
* 登录
*/
export function Login(data) {
    return service.request({
        method: "post",
        url: "/login/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}

/**
* 注册 
 */
export function Regiser(data){
    return service.request({
        method: "post",
        url: "/register/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
