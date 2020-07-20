import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

/**
 * 解决ElementUI导航栏重复点菜单报错问题
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//引入布局组件
import Layout from '@/views/Layout/index.vue'

const routes = [
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
      }
    ]
  },
  /**
   * 信息管理
   */
  {
    path: "/info",
    name: "Info",
    meta: {
      name: '信息管理',
      icon: 'info'
    },
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: '信息列表'
        },
        component: () => import("../views/Info/index.vue"),
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: '信息分类'
        },
        component: () => import("../views/Info/category.vue"),
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
      name: '用户管理',
      icon: 'users'
    },
    component: Layout,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: '用户列表'
        },
        component: () => import("../views/User/index.vue"),
      }
    ]
  },
  
];

const router = new VueRouter({
  routes
});

export default router;
