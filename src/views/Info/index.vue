<template>
    <div>
        <el-row :gutter="5">
            <el-col  :span="4">
                <div class="label-wrap category">
                    <label for="">类别:</label>
                    <div class="warp-content">
                        <el-select v-model="categoryValue" placeholder="请选择" size="small" style="width:100%">
                        <el-option
                            v-for="item in options.category"
                            :key="item.id"
                            :label="item.category_name"
                            :value="item.id"
                            >
                        </el-option>
                        </el-select>
                    </div>  
                </div>    
            </el-col>
            <el-col  :span="9">
                <div class="label-wrap date">
                    <label style="padding-right:8px" for="">日期:</label>
                    <div class="warp-content">
                        <el-date-picker
                        size="small"
                        v-model="dateValue"
                        type="datetimerange"
                        align="right"
                        value-format="yyyy-MM-dd hh:mm:ss"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00', '08:00:00']">
                        </el-date-picker>
                    </div>  
                </div>
            </el-col>
            <el-col :span="4">
                <div class="label-wrap key-work">
                    <label style="padding-right:8px" for="">关键字:</label>
                    <div class="warp-content">
                        <el-select v-model="search_key" placeholder="" size="small" style="width:90%">
                        <el-option 
                        v-for="item in searchOption" 
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                        </el-select>
                    </div>  
                </div>    
            </el-col>
            <el-col :span="3" >
                <el-input  size="small" v-model="search_keyWork" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2" >
                <el-button size="mini"  type="danger" @click="getList">搜索</el-button>
            </el-col>
            <el-col :span="2" >
                <el-button @click="dialog_info = true"  size="mini"  type="danger" class="pull-right"  >新增</el-button>
            </el-col>
        </el-row>

        <div class="black-space-25"></div>
        <!-- 表格 -->
        <el-table :data="tableData.item" stripe border style="width: 100% " v-loading="table_loading" @selection-change="handleSelectionChange">
             <el-table-column
            type="selection"
            width="45">
            </el-table-column>
            <el-table-column prop="title" label="标题" width="400"></el-table-column>
            <el-table-column  prop="categoryId" label="类型" width="100" :formatter="toCategory"></el-table-column>
            <el-table-column  prop="createDate" label="日期" width="155" :formatter="toDate"></el-table-column>
            <el-table-column prop="user" label="管理员" width="110"></el-table-column>
            <el-table-column label="操作"   >
                 <template slot-scope="scope">
                     <el-button type="danger" @click="deleteItem(scope.row.id)" size="mini">删除</el-button>
                     <el-button type="success" @click="editInfo(scope.row.id)"  size="mini" @getList="getList">编辑</el-button>
                 </template>

            </el-table-column>
        </el-table>
        
        <div class="black-space-25"></div>
        <!--  底部分页  -->
        <el-row >
            <el-col :span="8">
                <el-button type="small" @click="deleteAll">批量删除</el-button>
            </el-col>
            <el-col :span="16">
                <el-pagination
                class="pull-right"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>

            </el-col>
        </el-row>
        




        <!-- 新增弹窗 -->
        <DialogInfo :flag.sync="dialog_info" @close="closeDialog" :category="options.category" />
        <!-- 编辑弹窗 -->
        <DialogEditInfo :flag.sync="dialog_info_edit" @close="closeEditDialog" :id="infoID" :category="options.category" />
    </div>
</template>
<script>
import DialogInfo from "./dialog/info.vue"
import DialogEditInfo from "./dialog/edit.vue"
import { global } from "@/utils/global"
import { common } from "@/api/common" 
import { timestampToTime }  from "@/utils/common"
import { reactive, ref, onMounted, watch } from '@vue/composition-api'
import { GetCategory, GetList, DeleteInfo, GetCategoryAll } from '@/api/news.js'
export default {
    name: "infoIndex",
    components: { DialogInfo, DialogEditInfo},
    setup(props, { root }) {
      const { confirm } = global()
      const { getInfoCategory, category } = common()
        /**
         * 数据
         */
         
        const dialog_info = ref(false)
        const dialog_info_edit = ref(false)
        const search_key = ref('id')
        const categoryValue = ref('')
        const dateValue = ref('')
        const search_keyWork = ref('')
        const total = ref(0)
        const table_loading = ref(false)
        const deleteInfoId = ref('')
        const infoID = ref('')



        const options = reactive({
          category: []
        });

        const tableData =  reactive({
          item: []
        })

        //搜索关键字
        const searchOption = reactive([{
          value: "id",
          label: "ID"
        }, {
          value: "title",
          label: "标题"
        }])
        //页码
        const page = reactive({
          pageNumber: 1,
          pageSize: 10
        })



        // 函数
        const handleSizeChange = (value) => {
            page.pageSize = value
            getList()
        }
        const handleCurrentChange = (value) => {
            page.pageNumber = value
            getList()
        }
        const closeDialog = () => {
            dialog_info.value = false            
        } 
        const closeEditDialog = () => {
            dialog_info_edit.value = false 
            getList()
        }


        /**
         * 删除
         */
        const deleteItem = (id) => {
          deleteInfoId.value = [id]
          confirm({
            content: "确认删除当前信息，确认后将无法恢复！！",
            tip: "警告",
            fn: confirmDelete,
          })
        }
        const deleteAll = () => {
          if(!deleteInfoId.value || deleteInfoId.value.length ==0){
            root.$message({
              message: "请选择要删除的数据",
              type: "error"
            })
            return 
          }
          confirm({
            content: "确认删除选中的信息，确认后将无法恢复！！",
            tip: "警告",
            fn: confirmDelete,
          })
        }
        const confirmDelete = () => {         
          DeleteInfo({id: deleteInfoId.value}).then(response => {
            getList()
          })          
            deleteInfoId.value = ''
        }
        const handleSelectionChange = (value) => {
          let id = value.map(item => item.id)
          deleteInfoId.value = id
          console.log(deleteInfoId.value)
        }   
        
        
        const getInfo_category = () => {
            root.$store.dispatch('common/getInfoCategory').then(response =>{
            options.category = response.data.data.data
          }) 
        }
        const formatData = () => {
          let requestData = {

            pageNumber: page.pageNumber,
            pageSize: page.pageSize,            
          }
          //分类ID
          if(categoryValue.value) {
            requestData.categoryId = categoryValue.value
          }
          //日期
          if(dateValue.value) {
            requestData.startTiem = dateValue.value[0]
            requestData.endTiem = dateValue.value[1]
          }
          // 关键字
          if(search_keyWork.value){
            requestData[search_key.value] = search_keyWork.value
          }
           return requestData;
        }


        //编辑
        const editInfo = (id) => {
          dialog_info_edit.value = true
          infoID.value = id
        
        }

        const getList = () =>{
          let requestData = formatData()
          // let requestData = {
          //   categoryId: '',
          //   startTiem: '',
          //   endTime: '',
          //   title: '',
          //   id: '',
          //   pageNumber: page.pageNumber,
          //   pageSize: page.pageSize,
          // }
          table_loading.value = true
          GetList(requestData).then(response =>{
            let data = response.data.data
            //更新数据
            tableData.item = data.data
            //页码统计数量
            total.value = data.total
            table_loading.value = false
          }).catch(error => {
            table_loading.value = false
          })
        }
        //时间戳转日期
        const toDate = (row, column, cellValue, index) => {
          return timestampToTime(row.createDate)
        }
        //类别ID转类别名称
        const toCategory = (row) => {
         
          let categoryid = row.categoryId
          
          let data = options.category.filter(item => item.id == categoryid)
          return data[0].category_name
        }
         


        /** 
         * 生命周期挂载完成
         */
        onMounted(() =>{
          //vue3.0
          //getInfoCategory()
          
          //vuex
          getInfo_category()

          //获取列表
          getList()

        })
         

        /**
         * 监听api/common里category.item数据变化
         */
        watch(() => category.item, (value) => {
          options.category = value
        })
        return {
            //ref
            deleteInfoId,
            dialog_info,
            search_key,
            search_keyWork,
            categoryValue,
            dateValue,
            total,
            table_loading,
            dialog_info_edit,
            infoID,
            // reactive
            options,
            tableData,
            searchOption,
            page,
            // 函数
            handleSizeChange,
            handleCurrentChange,
            closeDialog,
            deleteItem,
            deleteAll,
            getInfo_category,
            getList,
            toDate,
            toCategory,
            handleSelectionChange, 
            formatData, 
            closeEditDialog,
            editInfo,

             

        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap{
    &.category { @include labelDom(left, 40, 32);}
    &.date { @include labelDom(right, 50, 32)}
    &.key-work { @include labelDom(right, 50, 32)}
}
 
</style>