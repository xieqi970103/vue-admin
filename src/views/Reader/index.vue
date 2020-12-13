<template>
    <div>
        <!-- 搜索框 和 新增书刊 -->
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
              <el-input  v-model="data.key_work" size="small" placeholder="请输入搜索的关键字"></el-input> 
          </el-col>
          <el-col :span="12">
            <el-button type="danger"  size="mini" class="pull-left"   style="font-size: 14px;" @click="search">搜索</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="danger"  size="mini" class="pull-right " style="font-size: 14px;" @click="hander_add_book" >添加读者</el-button>
          </el-col>
        </el-row>
        <div class="black-space-25"></div>

        <TableVue ref="userTable" :config="data.configTable" :tableRow.sync="data.tableRow"> 
            <!-- 插槽 -->
            <template v-slot:status="slotdata">
                <el-switch @change="handlerSwitch(slotdata.data)" v-model="slotdata.data.status" active-color="#13ce66" inactive-color="#ff4949" active-value="2" inactive-value="1"> </el-switch> 
            </template> 
            <template v-slot:operation="slotdata">  
                <el-button type="success" size="mini" @click="hander_edit_user(slotdata.data)">编辑</el-button>
                <el-button type="danger"  size="mini" @click="hander_delete_user(slotdata.data)">删除</el-button>  
            </template>
            <template v-slot:tableFootLeft> 
                <el-button   size="small" @click="hander_delete_batch(data.tableRow)">批量删除</el-button>
            </template>
        </TableVue> 
        <!-- 新增数据 -->
        <DialogAdd :flag.sync="data.dialog_add" @close="closeDialog" @refreshTableData="refreshData" :editData="data.editData"/>  
        
    </div>
</template>
<script>
import { reactive, ref, onMounted, watch } from '@vue/composition-api' 
import { global } from "@/utils/global" 
import { DeleteReader , AddReader} from "@/api/reader.js"

//组件
import SeleteVue from "@c/Select"
import TableVue from "@c/Table"   
import DialogAdd from "./dialog/add" 
export default {
    components: { SeleteVue, TableVue, DialogAdd},
    setup(props, { root, refs, emit }){
        const { confirm } = global()
        /**
         * 数据
         */
        const data = reactive({
            dialog_add: false,
            configOption: {
                init: ["reader_id","reader_name","reader_phone"]
            },
            selectData: {},
            editData: {},
            //下拉菜单数据
            selectData: {},
            //搜索关键字
            key_work: "",
            //table组件配置参数
            configTable: {    
                //多选框
                selection: true,
                //表头
                tHead: [
                   {
                        label: "ID号",
                        value: "reader_id",
                    },
                    {
                        label: "姓名",
                        value: "reader_name",
                    },
                    {
                        label: "联系方式",
                        value: "reader_phone",
                    },
                    {
                        label: "性别",
                        value: "reader_sex",
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
                    url: "getReaderList",
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
            //table选择数据
            tableRow: {},
            
        })


        /**
         * 函数   ********************************************************************************************************
         */
        /** 
         * 点击编辑
        */
        const hander_edit_user = (params) => {
            data.dialog_add = true
            // 浅拷贝 子组件赋值
            data.editData = Object.assign({}, params)

        }
        /**
         * 关闭新增
         */
        const closeDialog = () => { 
            data.dialog_add = false         
        } 
        /**
         * 点击新增
         */
        const hander_add_book = () => {
           data.editData = {}
           data.dialog_add = true 
        }
        /**
         * 搜索
         */
        const search = () => {
            let requestData = { 
                reader_id: "", 
                reader_name: "",
                reader_phone: ""
            }
            requestData[data.selectData.value] = data.key_work
            refs.userTable.paramsLoadData(requestData)
        }
        /**
         * 点击批量删除
         */
        const hander_delete_batch = (parms) => {
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
         *  点击删除
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
            DeleteReader(data.tableRow.idItem).then(response => { 
               refreshData()
            })
        }
        /**
         *  刷新列表
         */
        const refreshData = () => {
            refs.userTable.refreshData() //调用子组件内的函数，刷新表格数据
        }

        return { 
            data,
            //函数
            search,
            hander_delete_batch,
            hander_delete_user,
            refreshData,
            closeDialog,
            hander_add_book, 
            hander_edit_user
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