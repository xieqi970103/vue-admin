import service from "@/utils/request"
/**
 * 删除公告
 */
export function DeleteAnnouncement(data){
    return service.request({
        method: "post",
        url: "/deleteAnnouncement/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}
/**
 * 发布公告
 */
export function AddInfo(data){
    return service.request({
        method: "post",
        url: "/addAnnouncement/",
        data //传进来的变量名一样可以只写data   左边的后台接收的，右边的data是接收的参数
    })
}