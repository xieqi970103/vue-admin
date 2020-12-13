<template>
    <div> 
        <el-row :gutter="40">
            <!-- 教室情况 -->
            <el-col :span="7">
                <ClassTableVue ref="class_table" :config="data.class_configTable" />  
            </el-col>

            <!--  预约列表 -->
            <el-col :span="17">
                <ApplyTableVue ref="apply_table" :config="data.apply_configTable" >
                    <template v-slot:operation="slotdata"> 
                        <el-button   size="small" >详情</el-button>  
                        <el-button type="success" size="small" @click="affirm(slotdata.data)">同意</el-button>  
                        <el-button type="danger"  size="small" @click="refuse(slotdata.data)">拒绝</el-button>
                         
                    </template>
                    <template v-slot:tableFootLeft  > 
                        <div style="color: white;">1</div>
                    </template>
                </ApplyTableVue>  
            </el-col>


        </el-row>
    </div>
</template>
<script>
import { reactive, ref, onMounted, watch } from '@vue/composition-api' 
import {refuseApply, affirmApply, GetMessageCount} from '@/api/apply'
import { global } from "@/utils/global"
import store from "@/store/index"
//组件
import ClassTableVue from "@c/Table/index_class.vue"
import ApplyTableVue from "@c/Table/index.vue"
export default {    
    name: "applyIndex",
    components: {ClassTableVue, ApplyTableVue },
    setup(props, { root, refs, emit }){
        const { confirm } = global()
        const data = reactive({
            class_configTable: { 
                //多选框
                selection: false,
                //表头
                tHead: [
                    {
                        label: "场地编号",
                        value: "class_id", 
                    },
                    {
                        label: "场地名称",
                        value: "class_name", 
                    },
                    {
                        label: "场地状态",
                        value: "class_status", 
                    }, 
                ],
                //翻页记录
                recordCheckbox: false,
                //分页
                paginationShow: false,
                paginationLayout: "",
                //请求接口
                requestData: {
                    url: "getClassList",
                    method: "post",
                    data: {
                        username : "",
                        truename : "",
                        phone : "",
                        pageNumber : 1,
                        pageSize : 10
                    }
                },
            },
            apply_configTable: { 
                //多选框
                selection: false,
                //表头
                tHead: [
                    {
                        label: "编号",
                        value: "id", 
                        width: 50,
                    },
                    {
                        label: "申请人ID",
                        value: "applicant", 
                        width: 120
                    },
                    {
                        label: "预约场地",
                        value: "apply_class", 
                        width: 80
                    }, 
                    {
                        label: "预约时间",
                        value: "apply_time", 
                        width: 185
                    }, 
                    {
                        label: "操作",
                        columType: "slot",
                        slotName: "operation", 
                    }, 


                ],
                //翻页记录
                recordCheckbox: false,
                //分页
                paginationShow: true,
                paginationLayout: "total, sizes, prev, pager, next",
                //请求接口
                requestData: {
                    url: "getApplyList",
                    method: "post",
                    data: {
                        username : "",
                        truename : "",
                        phone : "",
                        pageNumber : 1,
                        pageSize : 10
                    }
                },
            },
            requestData_id: {}
        })
        // 点击驳回
        const refuse = (value) => {   
            let requestData = {
                id: value.id
            }   
            data.requestData_id = requestData 
            confirm({
                content: "确认驳回当前信息，确认后将无法恢复！！",
                tip: "警告",
                fn: confirmRefuse,
            }) 
        }
        /**
         * 确认驳回
         */ 
         const confirmRefuse = () => {   
            refuseApply(data.requestData_id).then(response => {
                root.$message({
                    message: response.data.message,
                    type: "success"
                })
                getCount()
                refreshData()
            })   
        }
        
        // 点击同意
        const affirm = (value) => {   
            let requestData = value 
            data.requestData_id = requestData 
            console.log(data.requestData_id )
            confirm({
                content: "同意当前信息，确认后将无法恢复！！",
                tip: "警告",
                fn: confirmAffirm,
            }) 
        }
        /**
         * 确认同意
         */ 
         const confirmAffirm = () => {   
            affirmApply(data.requestData_id).then(response => {
                root.$message({
                    message: response.data.message,
                    type: "success"
                }) 
                getCount()
                refreshData()
            })   
        }
         /**
         * 获取代办消息数
         */
         const getCount = () => {
            GetMessageCount().then(response => { 
                store.commit("app/SET_MESSAGE_COUNT", response.data.count)
                return  
            })
        } 
        
        
        
        
        /**
         *  刷新列表
         */
         const refreshData = () => {
            refs.apply_table.refreshData() //调用子组件内的函数，刷新表格数据
            refs.class_table.refreshData() //调用子组件内的函数，刷新表格数据
        }
 
        return {
            data, 
            refuse,
            confirmRefuse,
            refreshData,
            affirm,
            confirmAffirm,
            getCount
        }

    }
}    
</script>
<style lang="scss" scoped>
 
</style>