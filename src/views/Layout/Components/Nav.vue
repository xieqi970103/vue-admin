<template>
    <div id="nav-wrap">
        
        <h1 class="logo">
            <img src="../../../assets/images/logo.png">
        </h1>
        <el-menu 
        default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        :collapse="isCollapse" 
        background-color="transparent" 
        text-color="#fff" 
        active-text-color="#fff"
        type="999999"
        router
     
        >
            <template v-for="(item, index) in routers">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
                <!-- 一级菜单 -->
                    <template slot="title" >
                        <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
                        <span style="font-size: 12px; display:inline-block;height: 20px; line-height:20px; " class="text" slot="title">{{ item.meta.name }}</span>
                    </template>
                    <!-- 子菜单 -->
                    <template v-for="subItem in item.children"> 
                        <el-menu-item   v-if="!subItem.hidden" :key="subItem.id" :index="subItem.path" style="font-size: 12px; display:inline-block;height: 40px; line-height:40px; ">{{ subItem.meta.name }}</el-menu-item>
                    </template>
                     
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>
<script>
import { reactive, ref, onMounted, computed } from '@vue/composition-api'
export default {
    name: 'navMenu',
    setup(props, { root }){
        /**
         * data数据
         */
        const routers = reactive(root.$router.options.routes)
        /**
         * computed 监听
         */
        const isCollapse = computed(() =>{
            
            return root.$store.state.app.isCollapse
        })
        return {
            routers,
            isCollapse,
        }
    },
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
@import "../../../styles/elementui.scss";
#nav-wrap {
    position: fixed;
    top: 0px;
    left: 0px;
    width: $navMenu;
    height: 100vh;
    background-color: #303035;//#082542;
    @include webkit(transition, all 0.3s ease 0s);
    //-webkit-transition: all 0.3s ease 0s;
    //-moz-transition: all 0.3s ease 0s;;
    //-o-transition: all 0.3s ease 0s;
    //-ms-transition: all 0.3s ease 0s;
    //transition: all 0.3s ease 0s;;
    svg {
        font-size:20px;
        margin-right: 10px;
    }
}
.logo {
    text-align: center;
    img {
        margin: 10px auto 0 0;
        width: 80px;
        @include webkit(transition, all 0.3s ease 0s);
    }
}
.open {
    #nav-wrap {
        width: $navMenu;
    }
    .logo {
    text-align: center;
    img {
        margin: 10px auto 0 0;
        width: 80px;
    }
}
}
.close {
    #nav-wrap {
        width: 64px;
    }
    .logo img {
        margin: 40px auto 37px 0;
        width: 25px;
    }
}
 
</style>
