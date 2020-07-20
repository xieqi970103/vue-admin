<template>
    <div id="main-wrap">
        <div class="main-content">
            <div class="content">
                <router-view />
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'layoutMain',
    setup(){

    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
    height: 100vh;
    //position: fixed;
   // top: 75px;
   // left: $navMenu;
    //right: 0;
   // bottom: 0;
   // border: 30px solid #f7f7f7;
   // border-bottom: none ;
   // -webkit-box-sizing: border;

}
.main-content {
    width: 100%;
    height: 100%;
    padding-top: $layoutHeader + 30;
    padding-left: $navMenu +30;
    padding-right: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box ;
    background-color: #f7f7f7;
    @include webkit(transition, all 0.3s ease 0s);//过度效果

}
.content {
    width: 100%;
    height: 100%;
    padding: 30px 30px 0 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box ;
    background-color: #fff;
}
.open {
    .main-content {
        padding-left: $navMenu +30;
    }
}
.close {
    .main-content {
        padding-left: 94px;
    }
}
</style>
