import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);


/** 
 *  1.系统分配
 *  2.角色分配
 *  3.按钮级别分配
*/
/**
 *  1.默认路由
 *  2.动态路由
 */

/**
 * 解决ElementUI导航栏重复点菜单报错问题
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//引入布局组件
import Layout from '@/views/Layout/index.vue'

/**
 * 默认路由
 */
export const defaultRouterMap = [
  {
    path: "/",
    redirect: "login",//重定向
    hidden: true,
    meta: {
      name: '主页'
    },
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: '登录'
    },
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",//重定向
    meta: {
      name: '控制台',
      icon: 'console'
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: '首页'
        },
        component: () => import("../views/Console/index.vue"),
      },
      {
        path: "/consoleIndex",
        name: "consoleIndex",
        meta: {
          name: '控制'
        },
        component: () => import("../views/Console/consoleIndex.vue"),
      }

    ]
  },
]
 

// const routes = [
  
  
// ];

// const router = new VueRouter({
//   routes
// });

// export default router;
export default new VueRouter({
  routes:defaultRouterMap
})

/**
 * 动态路由
 * 角色 ：sale, technician, manager
 */
export const asnycRouterMap = [
  
  /**
   * 信息管理
   */
  {
    path: "/opinion",
    name: "Opinion",
    meta: {
      role: ['sale'],
      system: 'opinionSystem',//自定义key
      name: '信息管理',
      icon: 'info'
    },
    component: Layout,
    children: [
      { 
        path: "/opinionIndex",
        name: "OpinionIndex",
        meta: {
          keepAlive: true,
          role: ['sale'],
          name: '反馈列表'
        },
        component: () => import("../views/Opinion/index.vue"),
      },
      { 
        path: "/announcementIndex",
        name: "AnnouncementIndex",
        meta: {
          keepAlive: true,
          role: ['sale'],
          name: '公告管理'
        },
        component: () => import("../views/Announcement/index.vue"),
      }, 
    ]
  },
  // {
  //   path: "/info",
  //   name: "Info",
  //   meta: {
  //     role: ['sale'],
  //     system: 'infoSystem',//自定义key
  //     name: '信息管理',
  //     icon: 'info'
  //   },
  //   component: Layout,
  //   children: [
  //     { 
  //       path: "/infoIndex",
  //       name: "InfoIndex",
  //       meta: {
  //         keepAlive: true,
  //         role: ['sale'],
  //         name: '信息列表'
  //       },
  //       component: () => import("../views/Info/index.vue"),
  //     },
  //     {
        
  //       path: "/infoCategory",
  //       name: "InfoCategory",
  //       meta: {
  //         role: ['sale'],
  //         name: '信息分类'
  //       },
  //       component: () => import("../views/Info/category.vue"),
  //     },
  //     {
         
  //       path: "/infoDetailed",
  //       name: "InfoDetailed",
  //       hidden: true,
  //       meta: {
  //         role: ['sale'],
  //         name: '信息详情'
  //       },
  //       component: () => import("../views/Info/detailed.vue"),
  //     }
  //   ]
  // },
    /**
   * 信息管理
   */
  {
    path: "/applyroom",
    name: "Applyroom",
    meta: {
      role: ['sale'],
      system: 'applySystem',//自定义key
      name: '场地管理',
      icon: 'class'
    },
    component: Layout,
    children: [
      { 
        path: "/applyIndex",
        name: "ApplyIndex",
        meta: {
          keepAlive: true,
          role: ['sale'],
          name: '教室列表'
        },
        component: () => import("../views/Apply/index.vue"),
      },
      { 
        path: "/seatIndex",
        name: "SeatIndex",
        meta: {
          keepAlive: true,
          role: ['sale'],
          name: '座位列表'
        },
        component: () => import("../views/Seat/index.vue"),
      }
    ]
  },
  /**
   * 图书管理
   */
  {
    path: "/book",
    name: "Book",
    meta: {
      role: ['sale'],
      system: 'userSystem', //自定义key
      name: '书刊管理',
      icon: 'book'
    },
    component: Layout,
    children: [
      {
        
        path: "/bookIndex",
        name: "BookIndex",
        meta: {
          role: ['sale'],
          name: '书刊列表'
        },
        component: () => import("../views/Book/index.vue"),
      },
      {
        
        path: "/borrowIndex",
        name: "BorrowIndex",
        meta: {
          role: ['sale'],
          name: '借阅列表'
        },
        component: () => import("../views/Borrow/index.vue"),
      }
    ]
  },
  /**
   * 用户管理
   */
  {
    path: "/user",
    name: "User",
    meta: {
      role: ['sale'],
      system: 'userSystem', //自定义key
      name: '用户管理',
      icon: 'users'
    },
    component: Layout,
    children: [ 
      {
        
        path: "/readerIndex",
        name: "ReaderIndex",
        meta: {
          role: ['sale'],
          name: '读者列表'
        },
        component: () => import("../views/Reader/index.vue"),
      } 
    ]
  },
]