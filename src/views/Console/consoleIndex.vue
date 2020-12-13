<template>
    <el-row :gutter="30">
      <el-col :span="17">
          <div style="margin-top: 60px;">
            <ve-line :data="data.line_chartData" :settings="data.line_chartSettings"></ve-line>
          </div> 
      </el-col>
      <el-col :span="7">
          <div style="height: 70vh; border-left: 2px solid #333;  padding-top: 40px; padding-left: 20px;">
                <el-row :gutter="10">
                    <el-col :span="12">
                    
                    <div style="height: 42px;  ">
                        <img   src="@/assets/images/wendu.png" alt=""/>
                        <div style="display:inline-block; margin-left: 15px; font-size: 18px;">{{ data.wendu }} °C</div>
                    </div> 
                    </el-col>
                    <el-col :span="12">
                    <div style="height: 42px; display:inline-block;">
                        <img   src="@/assets/images/shidu.png" alt=""/>
                        <div style="display:inline-block; margin-left: 15px; font-size: 18px;">{{ data.shidu }} %</div>
                    </div>
                    </el-col> 
                </el-row>
                <div class="black-space-25"></div>

                <el-row :gutter="10">
                    <el-col :span="12">
                        
                        <div style="height: 42px;  ">
                            <img   src="@/assets/images/guangzhao.png" alt=""/>
                            <div style="display:inline-block; margin-left: 15px; font-size: 18px;">{{ data.guangzhao }}%</div>
                        </div> 
                    </el-col>
                    <el-col :span="12">
                        <div style="height: 42px; display:inline-block;">
                            <img   src="@/assets/images/yanwu.png" alt=""/>
                            <div style="display:inline-block; margin-left: 15px; font-size: 18px;">{{ data.yanwu }}</div>
                        </div>
                    </el-col> 
                </el-row>
                <div  class="black-space-10"></div>
                <hr/>
                
                <div style="font-size: 18px; padding-top: 10px;">设备</div>
                <div  class="black-space-25"></div>
                <el-row>
                  <el-col :span="15">
                    <img   src="@/assets/images/kongtiao.png" alt=""/>
                  </el-col>
                  <el-col :span="9">
                    <div style="margin-top: 10px;"> 
                        <el-switch
                        v-model="data.value1"
                        active-text="开"
                        inactive-text="关">
                        </el-switch>  
                    </div>  
                  </el-col>
                </el-row>
                <div  class="black-space-25"></div>
                <el-row>
                  <el-col :span="15">
                    <img   src="@/assets/images/light.png" alt=""/>
                  </el-col>
                  <el-col :span="9">
                    <div style="margin-top: 10px;"> 
                        <el-switch 
                        v-model="data.value2"
                        @change="changeLight($event,2)"
                        active-text="开"
                        inactive-text="关">
                        </el-switch>  
                    </div>  
                  </el-col>
                </el-row> 



          </div>

           
      </el-col>
    </el-row>
</template>
<script>
import { reactive, onMounted, watch } from '@vue/composition-api'
import { devConsole, getDevData,getDevDataList } from '@/api/dev' 
import axios from 'axios'
export default {
    setup(props, { root, refs, emit }){
         
         const data = reactive({
            value1: false,
            value2: false,
            wendu: "",
            yanwu: "",
            shidu: "",
            guangzhao: "",
             // 折线图配置
             line_chartSettings : {
                 axisSite: { right: ['humidity'] },
                 yAxisType: ['KMB', 'percent'],
                 yAxisName: ['数值', '比率'],
                 min: [15,0.2]
             },
             // 折线图数据
             line_chartData: {
                 columns: ['time', 'temperature', 'humidity'],
                 rows: [ 
                 ]
             }
         })  

 


         // 灯光控制
         const changeLight = (val) => {
                if(val){
                    var obj = {
                        kai: 111 
                       // guan: 1 
                    }
                     devConsole(obj).then(response => {  
                    })
                    setTimeout(() =>{
                        devConsole(obj).then(response => {  
                    })
                    },400);
                    // var data = JSON.parse(obj)
                    // console.log(obj)
                    //发送 POST 请求
                    // axios({
                    //     method: 'post',
                    //     url: 'http://api.heclouds.com/cmds?device_id=653454326',
                    //     headers: {
                    //         'Content-Type':'application/x-www-form-urlencoded',
                    //         'api-key' : "udr5FEh8X64gXNaX91aVBd08zsY=",
                    //         'Access-Control-Allow-Origin' : '*'
                    //     },
                    //     data: {
                    //     'kai': 111 
                    // }
                    // });
 
                }else{
                     var obj = {
                        // kai: 111 
                        guan: 1 
                    }
                    devConsole(obj).then(response => {  
                    })
                    setTimeout(() =>{
                        devConsole(obj).then(response => {  
                    })
                    },400);
                    // devConsole(obj).then(response => {  
                    // })
                    
                }
         }
         /**
         *  折线图数据  
        */
        const getList = () => {
            getDevDataList().then(response => { 
                // console.log(response)
                data.line_chartData.rows = response.data.data.Datalist 
            })
        }
        getList()
                // 获取最新数据
        const getNewData = () => {
            
            getDevData().then(response => { 
                let obj = response.data.data;
                data.wendu = obj.wenduData.dev_value;
                data.shidu = obj.shiduData.dev_value; 
                data.guangzhao = obj.guangzhaoData.dev_value;
                let yanwu_val = obj.yanwuData.dev_value;
                if(parseInt(yanwu_val) <= 80){
                    data.yanwu = "无"
                }else{
                    data.yanwu = "警报"
                } 
                
            })
        }   
        getNewData();
        setInterval(getNewData, 10000); 
       
         
         return {
             data,  
             changeLight,
             getList,
             getNewData
         }
    }
}
</script>
<style lang="scss" scoped>
img {
    height: 42px;
    vertical-align:middle;
}
</style>