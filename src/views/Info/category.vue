<template>
    <div id="category">
        <el-button type="danger" style="font-size:12px" size="small" @click="addFirst({type: 'category_first_add'})">添加一级分类</el-button>
        <hr class="hr-e9"/>
        <div>
            <el-row :gutter="30">
              <el-col :span="10" v-loading="category_loading">
                  <div class="category-wrap"  > 
                    <div class="category" v-for="firstItem in category.item" :key="firstItem.id"   >
                        <!-- 一级分类 -->
                        <h4>
                            <svg-icon icon-class="minus" @click="te"></svg-icon>
                            {{ firstItem.category_name }}
                            <div class="button-group">
                                <el-button size="mini" round @click="edit_category({ data: firstItem, type: 'category_first_edit'})" type="danger">编辑</el-button>
                                <el-button size="mini" round type="success" @click="add_children({ data: firstItem, type: 'category_children_add'})">添加子集</el-button>
                                <el-button size="mini" round @click="category_delete_first_comfirm(firstItem.id)">删除</el-button>
                            </div>
                        </h4>
                        <!-- 子级分类 -->
                        <ul v-if=" firstItem.children">
                            <li  v-for="childItem in firstItem.children" :key="childItem.id">
                                {{ childItem.category_name }}
                                <div class="button-group">
                                    <el-button size="mini" round type="danger" @click="edit_children_category_table({ data: childItem, type: 'category_children_edit'})">编辑</el-button>
                                    <el-button size="mini" @click="category_delete_children_comfirm(childItem.id)">删除</el-button>
                                </div>
                            </li>
                        </ul>
                    </div>
                     
                  </div>
              </el-col>
              <el-col :span="14">
                  <h4 class="menu-title">
                      分类编辑
                  </h4>
                    <el-form    label-width="142px"   class="from-wrap" ref="categoryFrom" >
                        <el-form-item label="一级分类名称" v-if="category_first_input">
                            <el-input v-model="form.categoryName" :disabled="category_first_disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称" v-if="category_children_input">
                            <el-input v-model="form.secCategoryName" :disabled="category_children_disabled"></el-input>
                        </el-form-item>
                        <el-form-item  >
                            <el-button type="danger" size="small" style="font-size:12px" @click="submit" :loading="submit_button_loading" :disabled="submit_buttom_disabled">确定</el-button>
                        </el-form-item>
                    </el-form>
              </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import { AddFirstCategory, GetCategory, DeleteCategory, EditCategory, AddChildrenCategory, GetCategoryAll} from '@/api/news.js'
import { global } from "@/utils/global"
import { reactive, ref, onMounted } from "@vue/composition-api"
export default {
    name: "category",
    setup(props, { root, refs }) {
        const { confirm } = global()
       
       
       //数据 *****************************************************************************************************
       /**
         * ref
         */
        const category_first_input = ref(true)
        const category_children_input = ref(true)
        const submit_button_loading = ref(false)
        const category_loading = ref(true)
        const category_first_disabled = ref(true)
        const category_children_disabled = ref(true)
        const submit_buttom_disabled = ref(true)
        const deleteID = ref('')
        const editID = ref('')
        const submit_button_type = ref('')

        /**
         * reactive 
         */
        const form = reactive({
          categoryName: '',
          secCategoryName: '',
           
        })

        const category = reactive({
            item:[],
            current:[]
        })

        /**
         * 方法**********************************************************************************************************
         */

        /**
         *  按钮
         */
        const submit = () => {
            if(submit_button_type.value == "category_first_add"){
                add_first_category()
            }
            if(submit_button_type.value == "category_first_edit"){
                edit_first_category()
            }
            if(submit_button_type.value == "category_children_edit"){
                edit_children_category()
            }
            if(submit_button_type.value == "category_children_add"){
                add_children_category()
            } 
             
        }
        /**
         * 添加一级分类
         */
        const add_first_category = () => {
            if(!form.categoryName){
                root.$message({
                        message: "分类名称不能为空",
                        type: "error"
                    })
                return false
            }
            //按钮加载状态
            submit_button_loading.value = true 
            AddFirstCategory({categoryName: form.categoryName}).then(response => {
                let data = response.data
                if(data.resCode === 0){
                    root.$message({
                        message: data.message,
                        type: "success"
                    })
                    category.item.push(response.data.data)
                }
                submit_button_loading.value =false
            //     refs.categoryFrom.resetFields();
                form.categoryName = ''
                form.secCategoryName = ''
                
            }).catch(error => {
                submit_button_loading.value =false
             //   refs.categoryFrom.resetFields();
                form.categoryName = ''
                form.secCategoryName = ''
                
            })
        }
        const addFirst = (params) => {
            submit_button_type.value = params.type
            
            category_first_input.value = true   
            category_children_input.value = false

            category_first_disabled.value = false
            submit_buttom_disabled.value = false
            
        }
        /**
         * 添加子集
         */ 
        const add_children = (params) => {
            //改变确定按钮类型
            submit_button_type.value = params.type
            //显示一二级输入框
            category_first_input.value = true   
            category_children_input.value = true
            //禁用一级，启用二级,启用button
            category_first_disabled.value = true
            category_children_disabled.value = false
            submit_buttom_disabled.value = false

            //显示一级分类的内容
            form.categoryName = params.data.category_name
            //存储数据
            category.current = params.data
        }
        const add_children_category = () => {
             
             
            AddChildrenCategory({categoryName: form.secCategoryName, parentId: category.current.id}).then(response => {
                let data = response.data
                if(data.resCode === 0){
                     
                    root.$message({
                        message: data.message,
                        type: "success"
                    })
                    getCategory()         
                }
                submit_button_loading.value = false
                form.categoryName = '' 
                form.secCategoryName = '' 
                category.current = []
                
            }).catch(error => {
                submit_button_loading.value =false
                form.categoryName = '' 
                form.seccategoryName = '' 
                category.current = []
             
            })

        }
        /**
         * 删除一级分类
         */ 
        const category_delete_first_comfirm = (categoryId) => {
            deleteID.value = categoryId
            confirm({
                    content: "确认删除当前信息，确认后将无法恢复！！",
                    tip: "警告",
                    fn: category_delete_first,
                    catchfn: () => {
                        deleteID.value =  '' 
                    }
            })     
        }
        const category_delete_first = () => {
            DeleteCategory({ categoryId : deleteID.value }).then(response =>{
                /**
                 * 操作数组
                 * 两个参数是删除，三个参数是替换\者插入
                 * splice('起始位置'，个数，{替换的数据})
                 */
                //遍历category.item找到id和deleteID.value相同数组的位置index
                let index = category.item.findIndex(item => item.id == deleteID.value  )
                category.item.splice(index,1)

                //filter 过滤,过滤掉deleteID.value的数据
                // let newdata = category.item.filter(item => item.id != deleteID.value  );
                // category.item = newdata
                deleteID.value = ''
            }).catch(error => {
            })
        }
        /**
         * 删除子集 
         */
        const category_delete_children_comfirm = (categoryId) =>{
            deleteID.value = categoryId
            confirm({
                    content: "确认删除当前信息，确认后将无法恢复！！",
                    tip: "警告",
                    fn: category_delete_children,
                    catchfn: () => {
                        deleteID.value =  '' 
                    }
            })    
        }
        const category_delete_children = () => {
            DeleteCategory({ categoryId : deleteID.value }).then(response =>{
                getCategory();
                deleteID.value = ''
            }).catch(error => {
            })
        }


        //编辑
        const edit_category = (params) =>{
             
            category_first_input.value = true   
            category_children_input.value = false

            category_first_disabled.value = false
            submit_buttom_disabled.value = false
            
            submit_button_type.value = params.type 
            category.current = params.data
            form.categoryName = params.data.category_name
        }
        const edit_first_category = () => {
            if(!form.categoryName){
                root.$message({
                        message: "分类名称不能为空",
                        type: "error"
                    })
                return false
            }
            //按钮加载状态
            submit_button_loading.value = true 
            EditCategory({id : category.current.id, categoryName: form.categoryName}).then(response => {
                let data = response.data
                if(data.resCode === 0){
                     
                    root.$message({
                        message: data.message,
                        type: "success"
                    })
                    let newdata = category.item.filter(item => item.id == category.current.id  )
                    newdata[0].category_name = response.data.data.data.categoryName
                }
                submit_button_loading.value =false
            //     refs.categoryFrom.resetFields();
                form.categoryName = '' 
                category.current = []
                
            }).catch(error => {
                submit_button_loading.value =false
             //   refs.categoryFrom.resetFields();
                form.categoryName = ''
                category.current = []
                
            })
        }



        /**
         * 修改子集
         */
        const edit_children_category_table = (params) => {
            category_first_input.value = false   
            category_children_input.value = true

            category_children_disabled.value = false
            submit_buttom_disabled.value = false
            
            submit_button_type.value = params.type 
            category.current = params.data 
            form.secCategoryName = params.data.category_name
        }
        const edit_children_category = () => {
            if(!form.secCategoryName){
                root.$message({
                        message: "分类名称不能为空",
                        type: "error"
                    })
                return false
            }
            //按钮加载状态
            submit_button_loading.value = true 
            EditCategory({id : category.current.id, categoryName: form.secCategoryName}).then(response => {
                let data = response.data
                if(data.resCode === 0){
                     
                    root.$message({
                        message: data.message,
                        type: "success"
                    })
                    getCategory()
                }
                submit_button_loading.value =false
            //     refs.categoryFrom.resetFields();
                form.secCategoryName = '' 
                category.current = []
                
            }).catch(error => {
                submit_button_loading.value =false
             //   refs.categoryFrom.resetFields();
                form.categoryName = ''
                category.current = []
                
            })
        }



 

        //加载
        const getCategory = () =>{
            GetCategoryAll({}).then( response =>{
                let data = response.data.data
                category.item = data
                category_loading.value = false
            }).catch(error => {
                category_loading.value = false
            })
        }

        const te = () => {

        }
        /**
         * 生命周期
         */
        //挂载完成时执行 （页面DOM元素）
        onMounted(() =>{
            getCategory()
            
        })

        return {
            // ref
            category_first_input,
            category_children_input,
            submit_button_loading,
            category_loading ,
            category_first_disabled,
            category_children_disabled,
            submit_buttom_disabled,
            submit_button_type,
            editID,
             
            // reactive
            form,
            category,
            //方法
            submit,
            addFirst,
            getCategory,
            category_delete_first_comfirm,
            category_delete_first,
            edit_category,
            add_first_category,
            edit_first_category,
            add_children,
            add_children_category,
            category_delete_children_comfirm,
            category_delete_children,
            edit_children_category_table,
            edit_children_category,
            te
        }
    }
}
</script>
<style lang="scss" scoped>
@import  "../../styles/config.scss";
.category-wrap {
    div:first-child{
        &:before {
            top: 20px;
        }        
    }
    div:last-child {
        &:before {
            bottom: 22px;
        }     
    }
}
.menu-title {
    line-height: 44px;
    background-color: #f3f3f3;
    padding-left: 22px;
}
.category{
    line-height: 44px;
    position:  relative;    
    cursor: pointer;
    &:before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 20px;
            width: 32px;
            border-left: 1px dotted #000;
            
        }
    h4 {
        position:  relative;
        padding-left: 40px;


    }
    svg {
        position: absolute;
        left: 12px;
        top: 13px;
        font-size: 17px;
        background-color: #fff;
    }
    li {
        position:  relative;
        padding-left: 40px;
        margin-left: 22px;
        &:before {
            content: '';
            position: absolute;
            top: 22px;
            left: 0;
            width: 32px;
            border-bottom: 1px dotted #000;
            
        }
    }
    li, h4 {
        @include webkit(transition, all .5s ease 0s);
        &:hover {
            background-color: #f3f3f3;
            .button-group {
                
                display: block;
            }
            
        }
    }
}
.button-group {
    display: none;
    position: absolute;
    right: 11px;
    z-index: 2;
    top: -1px;
    button {
        font-size: 12px;
    }

}
.from-wrap {
    width: 410px;
    padding-top: 26px;
}
.hr-e9 {
    width: calc( 100% + 60px);
    margin-left: -30px;
    border: none;
    margin-top: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #e9e9e9;
}
</style>