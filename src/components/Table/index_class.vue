<template>
    <div>
        <!-- <el-table 
        ref="multipleTable" 
        :data="data.tableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe   
        :row-style="{height: '50px'}"
        @selection-change="thatSelectCheckbox"
        @cell-mouse-enter="h">
            <template  v-for="item in data.tableConfig.tHead"  > 
                <el-table-column      :key="item.value" :prop="item.value" :label="item.label" :width="item.width"  ></el-table-column>
            </template>
        </el-table> -->

        <el-table 
        ref="multipleTable" 
        :data="data.tableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe  
        :cell-class-name="class_name"
        :row-style="{height: '50px'}" >
             
                <el-table-column prop="class_id" label="场馆编号" ></el-table-column>
                <el-table-column
                    label="姓名" >
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="right" width="150px">
                        <p>场馆编号: {{ scope.row.class_id }}</p>
                        <p>场馆名称: {{ scope.row.class_name }}</p>
                        <p>场馆状态: {{ scope.row.class_status }}</p>
                        <template v-if="scope.row.class_status != '空闲'">
                            <p>申请人: {{ scope.row.applicant }}</p>
                            <p>起始时间: {{ scope.row.class_start }}</p>
                            <p>结束时间: {{ scope.row.class_end }}</p>
                        </template>
                        <p>场馆容量: {{ scope.row.capacity }}</p>
                        <div slot="reference" class="name-wrapper"  >
                            <el-tag size="medium">{{ scope.row.class_name }}</el-tag>
                        </div>
                        </el-popover>
                    </template>
                 </el-table-column> 
                <el-table-column prop="class_status"     label="场馆状态" ></el-table-column>
        </el-table>
     
    </div>
</template>
<script>
import { reactive, ref, onMounted, watch, onBeforeMount } from '@vue/composition-api'
import { loadData } from "./tableLoadData"
import { pageInationHook } from "./pageInationHook"
//中央事件
import Bus from "@/utils/bus"
export default {
    name: "tableVue",
    props: {
        config: {
            type: Object,
            default: () => {}
        },
        tableRow: {
            type: Object,
            default: () => {}
        } 
    },
    setup(props, { root, emit }){
        // 加载数据
        const { tableData, tableLoadData } = loadData({ root });
        // 分页
        const { pageData, totalCount,  handleSizeChange, handleCurrentChange } = pageInationHook();
        const data = reactive({
            tableConfig: {
                selection: true,
                tHead:[],
                recordCheckbox: false,
                paginationLayout: "total, sizes, prev, pager, next, jumper",
                paginationShow: true,
                requestData:  {},
            },
            tableData: [],
        })
        //数据渲染
        watch([
            () => tableData.item,
            () => tableData.total
        ], ([tableData, total]) => {
            data.tableData = tableData;
            totalCount(total);
        })
        //页码监听
        watch([
            () => pageData.currentPage,
            () => pageData.pageSize,
        ], ([currentPage, pageSize]) => {
            let requestData = data.tableConfig.requestData
            if(requestData.data){
                // 赋值
                requestData.data.pageNumber = currentPage
                requestData.data.pageSize = pageSize
                tableLoadData(data.tableConfig.requestData)
            }
             
        })

        /**
         * 方法
         */
        // 初始化table配置项
        const initTableConfig = () => {
            let configData = props.config;
            let keys = Object.keys(data.tableConfig)
            for(let key in configData){
                if(key.includes(key)){ //includes
                    data.tableConfig[key] = props.config[key]
                }
                // data.tableConfig[key] == data.tableConfig.tHead
            }
        }
        /**
         * 勾选checkbox时触发
         */
        const thatSelectCheckbox = (val) => {
            let rowData = {
                idItem: val.map(item => item.id)
            }
            emit("update:tableRow", rowData)
        }
        /**
         *  刷新数据
         */
        const refreshData = () => {
           tableLoadData(data.tableConfig.requestData)
        }
        /**
         * 带参数刷新数据
         */
        const paramsLoadData = (params) => {
           let requestData = Object.assign({}, params, {
               pageNumber: 1,
               pageSize: 10, 
           })
           data.tableConfig.requestData.data = requestData
           tableLoadData(data.tableConfig.requestData)
        }

        const class_name = ({row, column, rowIndex, columnIndex}) => {
            if(row.class_status=="使用" && columnIndex == 2) {
                return 'text_red';
            }else if(row.class_status=="预约" && columnIndex == 2) {
                return 'text_yellow';
            }
             return '';
        }





         //注册方法
        Bus.$on('getTarget',(data)=> {  
              refreshData()
        }); 
        //挂载前
        onBeforeMount(() => {
            initTableConfig()
            tableLoadData(data.tableConfig.requestData)
        })
         
        return {
            data,
            pageData,  
            handleSizeChange, 
            handleCurrentChange,
            thatSelectCheckbox,
            paramsLoadData,
            refreshData,
            class_name
            
        }
    }
}
</script>
<style lang="scss" >
 .el-table  .text_red {
    color: red;
}
.el-table .text_yellow {
    color: rgb(209, 111, 31);
}
</style>
<style lang="scss" scoped> 
@import "../../styles/config.scss";
.label-wrap{
    &.category { @include labelDom(left, 40, 32);}
    &.date { @include labelDom(right, 50, 32)}
    &.key-work { @include labelDom(right, 50, 32)}
}
  .text_red {
    color: red;
}
.el-table .text_yellow {
    color: yellow;
}
 
</style>
<!-- 
初始化的数据，不需要监听
可以在挂载前预先处理
 -->
<!--  
v-slot插槽：父组件传内容到子组件显示

1、匿名插槽: 没有指定某一个插槽，全部显示
2、具名插槽：指定插槽的名称显示内容

父组件
<TableVue :config="data.configTable">
    <template #status> 
        <el-switch active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
    </template>
</TableVue>

子组件         
<el-table-column :key="item.value" :prop="item.value" :label="item.label" :width="item.width" v-if="item.columType === 'slot'">
    <template>
        <slot :name="item.slotName"></slot>
    </template>
<el-table-column>
                

3、作用域插槽：可以进行数据绑定，父子组件通讯

父组件
<template v-slot:status="slotdata"> 
    <el-switch v-model="slotdata.data.name" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
</template>
子组件
<slot :name="item.slotName" :data="scope.row"></slot>

-->