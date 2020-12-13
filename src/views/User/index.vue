<template>
    <div> 
        <el-row :gutter="10">
          <el-col :span="4">
              <div class="label-wrap category">
                    <label for="">关键字:</label>
                    <div style="padding-left: 5px" class="warp-content">
                        <SeleteVue :config="data.configOption" :selectData.sync="data.selectData"/>
                    </div>  
                </div>
          </el-col>
          <el-col :span="5">
              <el-input v-model="data.key_work" size="small" placeholder="请输入搜索的关键字"></el-input> 
          </el-col>
          <el-col :span="12">
            <el-button type="danger"  size="mini" class="pull-left"   style="font-size: 14px;" @click="search">搜索</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="danger"  size="mini" class="pull-right " style="font-size: 14px;" @click="hander_add_user">添加用户</el-button>
          </el-col>
        </el-row>

        <div class="black-space-25"></div>
        <TableVue ref="userTable" :config="data.configTable" :tableRow.sync="data.tableRow"> 
            <!-- 插槽 -->
            <template v-slot:status="slotdata">
                <el-switch @change="handlerSwitch(slotdata.data)" v-model="slotdata.data.status" active-color="#13ce66" inactive-color="#ff4949" active-value="2" inactive-value="1"> </el-switch> 
            </template>
            
            <template v-slot:operation="slotdata"> 
                <el-button type="danger"  size="mini" @click="hander_delete_user(slotdata.data)">删除</el-button>
                <el-button type="success" size="mini" @click="hander_edit_user(slotdata.data)">编辑</el-button>  
            </template>
            <template v-slot:tableFootLeft> 
                <el-button   size="small" @click="hander_delete_batch(data.tableRow)">批量删除</el-button>
            </template>
        </TableVue> 
        <DialogAdd :flag.sync="data.dialog_add" @close="closeDialog" @refreshTableData="refreshData" :editData="data.editData"/>
    </div>
</template>
<script>
import { reactive, ref, onMounted, watch } from '@vue/composition-api'
import { UserDelete,  UserActives } from '@/api/user'
import { global } from "@/utils/global"
//组件
import SeleteVue from "@c/Select"
import TableVue from "@c/Table"
import DialogAdd from "./dialog/add"
 
export default {
    name: "userIndex",
    components: { SeleteVue, TableVue, DialogAdd },
    setup(props, { root, refs, emit }) {
        const { confirm } = global()
         
         

        const data = reactive({
            dialog_add: false,
            configOption: {
                init: ["truename","username","phone"]
                },
            selectValue: "",
            editData: {},
            //下拉菜单配置参数
            option: [
                {value: "truename",label: "姓名"},
                {value: "username",label: "邮箱"},
                {value: "phone",label: "手机号"},
            ],
            //阻止状态
            updateUserStatusFlag: false,
            //table组件配置参数
            configTable: {
                 
                //多选框
                selection: true,
                //表头
                tHead: [
                    {
                        label: "用户名/邮箱",
                        value: "username",
                        width: 180
                    },
                    {
                        label: "真实姓名",
                        value: "truename",
                        width: 100
                    },
                    {
                        label: "手机号",
                        value: "phone",
                        width: 120
                    },
                    {
                        label: "地区",
                        value: "region",
                        width: 180
                    },
                    {
                        label: "角色",
                        value: "role",
                        width: 100
                    }, 
                    {
                        label: "禁启用状态",
                        value: "status",
                        columType: "slot",
                        slotName: "status",
                        width: 100
                    }, 
                    {
                        label: "操作",
                        columType: "slot",
                        slotName: "operation",
                        // width: 100
                    }, 
                ],
                //翻页记录
                recordCheckbox: true,
                //分页
                paginationShow: true,
                paginationLayout: "total, sizes, prev, pager, next, jumper",
                //请求接口
                requestData: {
                    url: "getUserList",
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
            //table选择数据
            tableRow: {},
            //下拉菜单数据
            selectData: {},
            //搜索关键字
            key_work: ""
        }) 
        /** 
         * 点击编辑
        */
        const hander_edit_user = (params) => {
            data.dialog_add = true
            // 浅拷贝 子组件赋值
            data.editData = Object.assign({}, params)
        }

        /**
         * 添加用户
         */
        const hander_add_user = () => {
           data.editData = {}
           data.dialog_add = true 
        }

        /**
         *  修改用户状态
         */
        const handlerSwitch = (val) => {
            if(data.updateUserStatusFlag){
                return false
            }
            data.updateUserStatusFlag = true
            let requestData = {
                id: val.id,
                status: val.status
            }
            UserActives(requestData).then(response => {
                let responseData = response.data
                root.$message({
                    message: responseData.message,
                    type: "success"
                })
                data.updateUserStatusFlag = false
            }).catch(err => {
                data.updateUserStatusFlag = false
            })
        }   
        /**
         * 批量删除
         */
        const hander_delete_batch = (parms) => {
            //console.log(parms.idItem)
            let userId = parms.idItem
            if(!userId || userId.lenght === 0){
                root.$message({
                    message: "请选择要删除的用户！！！",
                    type: "error"
                })
                return false;
            }
            confirm({
                content: "确认删除当前信息，确认后将无法恢复！！",
                tip: "警告",
                fn: confirmDelete,
            })
        }
        /**
         * 单点删除
         */
        const hander_delete_user = (parms) => {
            let userId = parms.id
            if(!userId || userId.lenght === 0){
                root.$message({
                    message: "请选择要删除的用户！！！",
                    type: "error"
                })
                return false;
            }
            data.tableRow.idItem = [parms.id]
            confirm({
                content: "确认删除当前信息，确认后将无法恢复！！",
                tip: "警告",
                fn: confirmDelete,
            })
        }
        /**
         * 确认删除
         */ 
        const confirmDelete = () => {         
           UserDelete({id: data.tableRow.idItem}).then(response => { 
               refreshData()
           })
        }
        /**
         *  刷新列表
         */
        const refreshData = () => {
            refs.userTable.refreshData() //调用子组件内的函数，刷新表格数据
        }
        /**
         * 搜索
         */
        const search = () => { 
             let requestData = { 
                phone: "", 
                username: "",
                truename: ""
             }
             requestData[data.selectData.value] = data.key_work
             if(data.selectData.value === "phone"){
                 requestData.phone = Number(data.key_work)
             }
            //  let requestData = {
            //      [data.selectData.value] : data.key_work,  //ES6写法 
            //  } 
             refs.userTable.paramsLoadData(requestData)
             
        }


         

        const closeDialog = () => { 
            data.dialog_add = false         
        } 
        return {
            data,
            //方法 
            closeDialog, 
            //delete_batch,
            hander_delete_batch,
            hander_delete_user,
            hander_edit_user,
            hander_add_user,
            handlerSwitch,
            confirmDelete, 
            refreshData,
            search
        }
    }
}
</script>
<style lang="scss" scoped>
.label-wrap{
    &.category { @include labelDom(left, 46, 32);}
    &.date { @include labelDom(right, 50, 32)}
    &.key-work { @include labelDom(right, 50, 32)}
}
 
</style>