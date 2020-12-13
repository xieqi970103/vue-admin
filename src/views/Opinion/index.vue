<template>
    <div>
        <el-row :gutter="30">
            <el-col :span="15">
                <TableVue ref="opinionTable" :config="data.configTable" :tableRow.sync="data.tableRow"> 
                    <!-- 插槽 --> 
                    <template v-slot:operation="slotdata">  
                        <el-button  size="mini" @click="dispose(slotdata.data)" type="danger">处理</el-button> 
                    </template>
                    <template v-slot:tableFootLeft> 
                         <span style="color: white;"> 1</span>
                    </template>
                </TableVue> 
            </el-col>
            <el-col :span="9">
                <div style="text-align: center;font-size: 20px;">信息处理</div> 
                <div class="feedback_wrap">
                    <el-form :model="form" ref="addInfoForm"  >
                        <el-form-item label="用户ID："   prop="user_id" label-width="90px">
                            <el-input v-model="form.user_id"  placeholder="" size="small" disabled></el-input>
                        </el-form-item>
                        <div class="black-space-10"></div>
                        <el-form-item label="联系方式："   prop="user_phone" label-width="90px">
                            <el-input v-model="form.user_phone" placeholder="" size="small" disabled></el-input>
                        </el-form-item>
                        <div class="black-space-10"></div>
                        <el-form-item label="用户意见："   prop="user_opinion" label-width="90px">
                            <el-input v-model="form.user_opinion" 
                            placeholder=""
                            size="small" 
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 6}"
                            disabled
                            ></el-input>
                        </el-form-item> 
                        <el-form-item label="意见回复："   prop="admin_opinion" label-width="90px">
                            <el-input v-model="form.admin_opinion" 
                            placeholder=""
                            size="small" 
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 6}"
                            > 
                            </el-input>
                        </el-form-item> 
                        <el-form-item label-width="90px">
                            <el-button @click="submit" type="danger" size="small">提交</el-button>
                            <el-button @click="resetForm()" size="small">重置</el-button>
                        </el-form-item>
                    </el-form>   
                    
             
                      
                    
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { reactive, ref, onMounted, watch } from '@vue/composition-api' 
import { GetMessageCount} from '@/api/apply'
import { global } from "@/utils/global" 
import store from "@/store/index"
import { SubmitFeedback } from "@/api/opinion.js"

//组件
import SeleteVue from "@c/Select"
import TableVue from "@c/Table"   
 
export default {
    components: { SeleteVue, TableVue},
    setup(props, { root, refs, emit }){
        const data = reactive({
            configTable: {    
                //多选框
                selection: false,
                //表头
                tHead: [
                   {
                        label: "用户ID",
                        value: "user_id",
                        width: 140
                    },
                    {
                        label: "反馈意见",
                        value: "user_opinion",
                    },
                    {
                        label: "提交时间",
                        value: "submit_time",
                        width: 140
                    },
                    {
                        label: "状态",
                        value: "opinion_status",
                        width: 80,
                    },
                    {
                        label: "操作",
                        columType: "slot",
                        slotName: "operation", 
                        width: 80,
                    }, 
                ],
                //翻页记录
                recordCheckbox: true,
                //分页
                paginationShow: true,
                paginationLayout: "total, sizes, prev, pager, next, jumper",
                //请求接口
                requestData: {
                    url: "getOpinionList",
                    method: "post",
                    data: {
                        reader_id : "",
                        reader_name : "",
                        reader_phone : "",
                        pageNumber : 1,
                        pageSize : 10
                    } 
                }, 
            },
            tableRow: {},
            user_id: "",
            user_phone: "",
            user_opinion: "",
        })
        const form = reactive ({
            id: "",
            user_id: "",
            user_phone: "",
            user_opinion: "",
            admin_opinion: ""
        })
        // 点击处理
        const dispose = (value) => {     
            form.id = value.id;
            form.user_id = value.user_id;
            form.user_phone = value.user_phone;
            form.user_opinion = value.user_opinion;
        }
        // 重置表单
        const resetForm = () => {
            form.id = "", 
            form.user_id = "",
            form.user_phone = "",
            form.user_opinion = "",
            form.admin_opinion = ""
        }
        // 提交表单
        const submit = () => {
            SubmitFeedback(form).then(response => {
                root.$message({
                    message: response.data.message,
                    type: "success"
                })
                refreshData()
                resetForm()
                getCount()
            })
        }
        /**
         *  刷新列表
         */
         const refreshData = () => {
            refs.opinionTable.refreshData() //调用子组件内的函数，刷新表格数据
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
        return {
            data,
            form,
            dispose,
            resetForm,
            submit
        }

    }
}
</script>
<style lang="scss" scoped>
.feedback_wrap{ 
    margin:0 auto;
    padding: 5px 20px 20px 20px; 
    border: black;
}
</style>