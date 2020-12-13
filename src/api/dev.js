import xieqi from "@/utils/xieqiRequest"
import server from "@/utils/request"
/**
 *  控制灯光
 */
export function devConsole(data){
    return xieqi.request({
        method: "post",
        url: "",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}

/**
 *  获取最新环境数据
 */
export function getDevData(){
    return server.request({
        method: "post",
        url: "/getDevData/"
    })
}

/**
 *  获取时间段内平均环境数据
 */
export function getDevDataList(){
    return server.request({
        method: "post",
        url: "/getDataList/"
    })
}