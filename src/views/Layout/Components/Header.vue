<template>
    <div id="header-wrap">   
        <div class="pull-left header-icon" @click="navMenuState">
            <svg-icon iconClass="menu" className="menu"></svg-icon>
            <div class=" pull-right" style="padding-left: 50px;" id="weather"></div>
        </div>
        <div class="pull-right"> 
             
            <div class="user-info pull-left" style="text-align:center;">
                <el-badge is-dot :hidden="message_badge" class="item">
                    <img class="mes" src="../../../assets/images/message.png" alt="">
                </el-badge>
                <img  src="../../../assets/images/logo.png" alt="">
                 
                <el-dropdown>
                    <span class="el-dropdown-link">{{ username }} <i class="el-icon-arrow-down el-icon--right"></i></span> 
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item disabled>当前用户：超级管理员</el-dropdown-item> 
                        <el-dropdown-item style="text-align:center">修改密码</el-dropdown-item> 
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="header-icon pull-left" @click="exit">
                <svg-icon iconClass="close" className="close"></svg-icon>
            </div>
        </div>
    </div>
</template>
<script>
import { computed } from '@vue/composition-api'
import { reactive, ref, onMounted, watch } from '@vue/composition-api' 
import { GetMessageCount } from '@/api/apply'
import store from "@/store/index"
import axios from 'axios'
export default {
    name: 'layoutHeader',
    setup(props, { root }){ 
        const message_badge = ref(true)
        // const data = reactive({
        //     meassage: false;
        // })
        const username = computed(() => {
            return root.$store.state.app.username
        })
        const navMenuState = () => {
            root.$store.commit('app/SET_COLLAPSE') 
        }
        
        //退出
        const exit = () => {
            root.$store.dispatch('app/exit').then(() => {
                        root.$router.push({
                        name: 'Login'
                    })
                }).catch(err =>{
                    console.log('err')
                })
        }
        /**
         * 获取代办消息数
         */
        const getCount = () => {
            GetMessageCount().then(response => {
                if(response.data.count != 0 ){
                    message_badge.value = false
                    return false
                }
                message_badge.value = true
            })
        } 
        watch(() => store.getters['app/message_count'], (value, oldValue) => { 
            if(value != 0 ){
                    message_badge.value = false
                    return false
            }
                message_badge.value = true
        })
        getCount();

        // 获取天气 start**************************************************************************************************************
        const searchWeather = () =>{
           
           var that = this;
           axios.get('http://wthrcdn.etouch.cn/weather_mini?city='+'三明')
           .then(function(response){
               var data = response.data.data.forecast;
               var da = new Date();
               var date = da.getFullYear() + "-" +  da.getMonth() + "-" + da.getDate();
               var obj = '三明 |' + ' ' + date + ' | 星期' + da.getDay() + ' | ' + data[0].type  + ' | 今日温度: ' + data[0].low + '-' + data[0].high
               var el = document.getElementById('weather');
               el.innerHTML = obj; 
            //    that.weatherList = response.data.data.forecast
           })
           .catch(function(err){})
        }
        searchWeather()

        // 获取天气 end**************************************************************************************************************


        return { 
            message_badge,
            navMenuState,
            username,
            exit,
            searchWeather
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
    position: fixed;
    top: 0;
    right: 0;
    left: $navMenu;
    height: $layoutHeader;
    background-color: white;
    -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1); /*阴影*/
    @include webkit(transition, all 0.3s ease 0s);//过度效果
    line-height: $layoutHeader;
}
.header-icon {
    padding:0 32px;
    svg {
        margin-bottom: -5px;
        font-size: 25px;
        cursor: pointer;
    }
}
.user-info {
    height: 100%;
    padding: 0 32px;  
    border-right:  1px solid #ededed;
    + .header-icon {
        padding: 0 32px;
    }
     
}

span {
	height:100%;
	vertical-align:middle;
	line-height:32px;
}
img {
    height: 28px; 
	vertical-align:middle;
}
 
.open {
    #header-wrap {
        left: $navMenu;
    }
}
.close {
    #header-wrap {
        left: 64px;
    }
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  
.item { 
  margin-right: 40px;
}
.mes {
    height: 20px; 
}
</style>
<style >
.el-badge__content.is-fixed {
    top:20px;
} 
</style>
 