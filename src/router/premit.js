import router from "./index";
import store from "../store/index"
import { getToKen, removeToKen,  removeUserName} from "@/utils/app";

const WhiteRouter = ['/login'];//indexOf方法，判断数组中是否存在指定的某个对象,如果不存在返回-1
// 路由守卫
router.beforeEach((to, from, next) => {
    if(getToKen()){
       
        
        
        //返回login界面删除cookie内的数据
        if(to.path === "/login"){
            removeToKen()
            removeUserName()
            store.commit("app/SET_TOKEN", '')
            store.commit("app/SET_USERNAME", '')
            next() // to
        } else {
             //路由动态添加，分配菜单，每一个角色分配不同的菜单
             next() // to
        }
        
        
    }else{
        if(WhiteRouter.indexOf(to.path) !== -1){
            next() // to
        } else {
            next('/login')//路由指向
        }
        /**
         * 1. 直接进入index的时候。参数to被改变成"/index".触发路由指向。就会跑beforeEach
         * 2. 再次next 指向login . 再次发生路由指向，在跑beforeEach 参数to被改变成 "/login"
         * 3. 白名单判断存在。则直接执行next(). 因为没有参数不会再次beforeEach
         */

    }
    // console.log(to) //进入的页面（下一个页面）
    // console.log(from) //离开前的页面（上一个）
    // console.log(next) 
    // next() // to
    // // token
})