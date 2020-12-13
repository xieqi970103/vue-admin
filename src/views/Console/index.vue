<template>
    <div class="wrap">  
        <el-row :gutter="30">
            <el-col :span="6">
                <div class="up_wrap">
                    <div class="card-header">
                        用户量 
                        <span class="unit" style="background-color: #232323">
                            总
                        </span>
                    </div>
                    <div class="card-body">
                        <p class="count">{{ data.reader_count }}</p>
                        <p>新增用户
                            <span style="float: right;">
                                **%
                            </span>
                        </p>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="up_wrap">
                    <div class="card-header">
                        访问量 
                        <span class="unit" style="background-color: #00A1FF">
                            年
                        </span>
                    </div>
                    <div class="card-body">
                        <p class="count">{{ data.reader_flux }}</p>
                        <p>新增访问
                            <span style="float: right;">
                                **%
                            </span>
                        </p>
                    </div>
                </div> 
            </el-col>
            <el-col :span="6">
                <div class="up_wrap">
                    <div class="card-header">
                        待办消息 
                        <span class="unit" style="background-color: #FFB400">
                            月
                        </span>
                    </div>
                    <div class="card-body">
                        <p class="count">{{ data.message_count }}</p>
                        <p>回复率
                            <span style="float: right;">
                                **%
                            </span>
                        </p>
                    </div>
                </div>  
            </el-col>
            <el-col :span="6">
                <div class="up_wrap">
                    <div class="card-header">
                        上座率 
                        <span class="unit" style="background-color: green">
                            时
                        </span>
                    </div>
                    <div class="card-body">
                        <p class="count">{{ data.seat_rate }}</p>
                        <p>密度
                            <span style="float: right;">
                                **
                            </span>
                        </p>
                    </div>
                </div>   
            </el-col>
        </el-row>
        <div style="margin-top: 30px;"></div>
        <el-row :gutter="30">
            <el-col :span="15">
                <div class="grid-content-next bg-purple"> 
                    <ve-pie :data="data.chartData" :settings="data.chartSettings"></ve-pie>
                </div>
            </el-col>
            <el-col :span="9">
                <div class="grid-content-next bg-purple" style="text-align: center"> 
                    <div style="margin-top: 40px;"></div>
                    <ve-line :data="data.line_chartData" :settings="data.line_chartSettings"></ve-line>
                </div>
            </el-col>    
        </el-row>
    </div>
</template>
<script>
import { reactive, onMounted } from '@vue/composition-api'
import { GetBookType } from '@/api/book.js'  
import { GetMessageCount } from '@/api/apply'
import { GetReaderCount, GetReaderFlux } from '@/api/reader'
import { GetSeatCount } from '@/api/seat' 
import { getDevDataList } from '@/api/dev'
export default {
    setup(props, { root, refs, emit }){
         
        const data = reactive({
            // 待办信息
            message_count: 0,
            // 读者数
            reader_count: 0,
            // 访问量
            reader_flux: 0,
            // 上座率
            seat_rate: 0,
            // 饼图配置
            chartSettings: { 
                offsetY: 250,
                radius: 130
            }, 
            // 饼图数据
            chartData: {
                columns: ['type_name', 'number'],
                rows: []
            },
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
                    { '日期': '1/1', '温度': 24.5, '湿度': 0.32 },
                ]
            }
        })


        /** 
         * 方法
        */
        const getType = () => {
            GetBookType().then(response => { 
                data.chartData.rows = response.data.data
            })
        } 

        /**
         *  折线图数据  
        */
        const getList = () => {
            getDevDataList().then(response => { 
                data.line_chartData.rows = response.data.data.Datalist 
            })
        }



         /**
         * 获取代办消息数
         */
        const getMessageCount = () => {
            GetMessageCount().then(response => { 
               data.message_count = response.data.count
            })
             
        } 
        /**
         * 获取用户数量
         */ 
        const getReaderCount = () => {
            GetReaderCount().then(response => { 
                data.reader_count = response.data.data
            })
        }
        /**
         * 获取用户数量
         */ 
        const getReaderFlux = () => {
            GetReaderFlux().then(response => { 
                data.reader_flux = response.data.data
            })
        }
        /**
         * 获取上座率
         */ 
        const getSeatCount = () => {
            GetSeatCount().then(response => { 
                data.seat_rate = response.data.count
            })
        }
        /**
         * 获取数据
         */
        const getDataCount = () => {
            getMessageCount()    // 待办消息数
            getReaderCount()     // 读者数量  
            getReaderFlux()     // 访问量  
            getSeatCount() 
            getType()            // 图书类型饼图数据
            getList()           // 折线图数据
        }
         
        getDataCount()
        
        return {
            data,
            getType,
            getList,
            getReaderCount,
        }
    }
}
</script>
<style lang="scss" scoped>
.wrap {
    background-color: #f7f7f7;
    width: 106%;
    height: 88vh;
    margin-left: -30px;
    margin-top: -30px;
    // padding-top: 30px;
    // padding-left: 30px; 
}
.el-row {
margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-purple {
    background: white;
    box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
    border-radius : 3px; 
}
.grid-content {
    border-radius: 4px;
    min-height: 130px;
}
.grid-content-next {
    border-radius: 4px;
    min-height: 450px;
    padding:10px
}

img {
    height: 48px;
    margin-top: 10px;
}  

.up_wrap { 
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 4px; 
    color: #666;  
    
}
.card-header {
    text-align: left;
    height: 42px;
    padding: 0 15px; 
    line-height: 42px;
    border-bottom: 1px solid #f7f7f7;
    color: #666;  
    .unit { 
        width: 20px;
        height: 20px;
        float: right; 
        margin-top: 11px; 
        text-align: center;
        line-height: 20px; 
        color: #fff;
        border-radius: 4px;
    }
}
.card-body { 
    padding: 15px;
    color: #666;  
    .count {
        font-size: 36px;
        font-weight: 400; 
        padding: 0 0 10px 0; 
    } 
}
</style>