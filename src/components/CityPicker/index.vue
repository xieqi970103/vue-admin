<template>
    <div class="overflow-h"> 
        <el-row :gutter="10">  
            <el-col :span="6" v-if="init.province">
                <el-select v-model="data.provinceValue" @change="handlerProvince">
                    <el-option v-for="item in data.provinceData" :key="item.PROVINCE_CODE" :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.city">
                <el-select v-model="data.cityValue" @change="handlerCity">
                    <el-option v-for="item in data.cityData" :key="item.CITY_CODE" :value="item.CITY_CODE" :label="item.CITY_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.area">
                <el-select v-model="data.areaValue" @change="handlerArea">
                    <el-option v-for="item in data.areaData" :key="item.AREA_CODE" :value="item.AREA_CODE" :label="item.AREA_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.street">
                <el-select v-model="data.streetValue" @change="handlerStreet">
                    <el-option v-for="item in data.streetData" :key="item.STREET_CODE" :value="item.STREET_CODE" :label="item.STREET_NAME"></el-option>
                </el-select>
            </el-col> 
        </el-row>
    </div>
</template>
<script> 
import { reactive, ref, watch, onBeforeMount} from '@vue/composition-api'
import { cityPicker } from "@/mixins/cityPicker"
export default {
    name: "cityPicker",
    props: {
        cityPickerData: {
            type: Object,
            default: () => {}
        },
        cityPickerLevel: {
            type: Array,
            default: () => []
        }
    },
    setup (props, { root, emit}){
        //初始化省市区街联动
        const init = reactive({
            province: false,
            city: false,
            area: false,
            street: false
        })
        // 线件方法
        const {
            //事件
            getProvince,  handlerProvince , handlerCity, handlerArea,  handlerStreet,
            //数据集合
            data,  resultData 
        } = cityPicker()    //来自cityPicker.js

        /**
         * 初始化
        */
        const initCityPicker = () => { 
            let initData = props.cityPickerLevel
            if(initData.length === 0){
                for(let key in init){
                    init[key] = true
                }
            }else{
                initData.forEach(element => { 
                    init[element] = true
                });
            }
        }
        /**
         *  监听 
         */
        watch([
            () => resultData.provinceValue,
            () => resultData.cityValue,
            () => resultData.areaValue,
            () => resultData.streetValue,
        ], ([province, city, area, street])=> { 
            emit("update:cityPickerData", resultData)
            
        }) 
        onBeforeMount(() => { 
            //初始化
            initCityPicker()
             //获取省份
            getProvince()
        })
       

        return {
            data,
            init,
            // provinceData,
            // provinceValue,
            // cityData,
            // areaData,
            // streetData,
            // cityValue,
            // areaValue,
            // streetValue,
            //函数
            getProvince,
            handlerProvince,
            handlerCity,
            handlerArea,
            handlerStreet,




              
        
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
<!-- 
    组件目录位置：
        src => components => CityPicker => index.vue
    组件引用方式：
        import SeleteVue from "@c/CityPicker"
    template:
        <CityPicker :cityPickerLevel="['province', 'city', 'area', ]" :cityPickerData.sync="data.cityPickerData"></CityPicker>  
    参数配置：
         const data = reactive({ 
                cityPickerData: {}, //数据类型： Object;  
          })

        cityPickerLevel: [] //数据类型： Array; 可配置数据   province  city area street 
         


 -->