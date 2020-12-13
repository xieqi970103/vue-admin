<template>
    <el-select  v-model="data.selectValue" size="small" style="width:100%" placeholder="请选择" @change="handerselect">
        <el-option v-for="item in data.initOption" :key="item.value" :value="item.value" :label="item.label"  ></el-option>
    </el-select>
</template>
<script >
import { reactive, ref, onMounted, watch } from '@vue/composition-api'
 
export default {
    /**
     * 组件的过程要做什么事情 （七牛云的token,显示默认图片，选择图片后渲染自身图片）
     * 最终结果要做什么 （返回选择后的图片路径）
     */
    name:"Select",
    props: {
         config: {
             type: Object,
             default: () => {}
         },
         selectData: {
             type: Object,
             default: () => {}
         }
    },
    setup(props, { root, emit }) { 
        const data = reactive({
            selectValue: "",
            initOption: [],

            option: [
                {value: "truename",label: "姓名"},
                {value: "username",label: "邮箱"},
                {value: "phone",label: "手机号"},
                {value: "bookname",label: "书名"},
                {value: "author",label: "作者"},
                {value: "press",label: "出版社"},
                {value: "reader_id",label: "ID"},
                {value: "reader_name",label: "姓名"},
                {value: "reader_phone",label: "联系方式"},
                {value: "book_name",label: "书名"},
                {value: "book_author",label: "作者"},
                {value: "id",label: "编号"},
                {value: "announcement",label: "公告信息"},
                {value: "admin",label: "管理员"},

                
            ]
        })
        /*
         * 初始化下拉选择
         */
        let initOption = () => {
            let initData = props.config.init 
            if(initData.length === 0){
                console.log("config的参数是空的  无法显示下拉菜单")
                return false;
            }
           
            let optionArr = [];
            initData.forEach(item => {
                let arr = data.option.filter(elem => elem.value == item)[0] // filter匹配成功之后是一个数组，需要去下表第一个
                optionArr.push(arr);
            }) 
            // 初始化赋值
            data.initOption = optionArr;
            // 初始化搜索类型
            data.selectValue = optionArr[0].label
            emit("update:selectData", optionArr[0])
        }
        /**
         * 选择触发
        */
        const handerselect = (val) => {
            let select_data = data.option.filter(item => item.value == val)[0] 
           
            emit("update:selectData", select_data)
        }
        onMounted(() =>{
            initOption();
            
        })

        return {
            data,
            handerselect,
            
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
<!-- 
    组件目录位置：
        src => components => Select => index.vue
    组件引用方式：
        import SeleteVue from "@c/Select"
    template:
        <SeleteVue :config="data.configOption"/>
    参数配置：
        configOption: {
            init: ["name","email","phone"] //数据类型： Array; 可配置数据："truename","username","phone"
        },


 -->