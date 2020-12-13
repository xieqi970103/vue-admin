<template>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="600px" @opened="openDialog">
        <el-form :model="form" ref="addInfoForm"  >
            <el-form-item label="用户ID：" :label-width="formLabelWidth" prop="username">
                <el-input v-model="form.reader_id" placeholder="请输入用户ID" size="medium"></el-input>
            </el-form-item>
            <div class="black-space-10"></div>
            
            <el-form-item label="姓名：" :label-width="formLabelWidth">
                <el-input v-model="form.reader_name" placeholder="请输入用户姓名" size="medium"></el-input>
            </el-form-item>
            <div class="black-space-10"></div>

            <el-form-item label="密码：" :label-width="formLabelWidth"  >
                <el-input v-model="form.reader_password" type="password"  placeholder="请输入密码" size="medium"></el-input>
            </el-form-item>
            <div class="black-space-10"></div>

             

            <el-form-item label="电话：" :label-width="formLabelWidth" >
                <el-input v-model="form.reader_phone" placeholder="请输入电话" size="medium"></el-input>
            </el-form-item>
            <div class="black-space-10"></div>

            <el-form-item label="性别：" :label-width="formLabelWidth" >
                <el-input v-model="form.reader_sex" placeholder="请输入性别" size="medium"></el-input>
            </el-form-item>
            <div class="black-space-10"></div>

             
            
        </el-form>
       
       
       
       <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="danger" @click="submit('addInfoForm')" :loading="submit_login">确 定</el-button>
      </div>
      </el-dialog>
</template>
<script> 
    import { reactive, ref, refs, onMounted, watchEffect, onBeforeMount} from '@vue/composition-api'
    import { AddReader } from '@/api/reader.js'
    import { stripscript, validateEmail } from '@/utils/validate'
    //组件
    import CityPicker from '@c/CityPicker'
    //中央事件
    import Bus from "@/utils/bus"
    export default {
        name: 'dialogInfo',
        // 单向数据流，父级 -> 子级 不能反向修改
        components:  { CityPicker },
        props: {
            flag: {
                type: Boolean,
                default: false
            },
            editData: {
                type: Object,
                dafault: () => {}
            }
        },
        setup(props, { root, emit, refs }){
             
            const dialog_info_flag = ref(false) //弹窗标记
            const formLabelWidth = ref('100px')
            const submit_login = ref(false)

 
            const form = reactive({
                reader_id : '',
                reader_name : '',
                reader_password : '',
                reader_phone : '',
                reader_sex :''  
                 
            })
             // watch
            watchEffect(() => {
                dialog_info_flag.value = props.flag
            })  
             
             
            // 函数

            /**
             * 弹窗打开，动画结束时
            */
            const openDialog = () => {
                
                // 初始值处理
                let editData = props.editData            
                if(editData.id){ //编辑 
                    for(let key in editData){
                        form[key] =  editData[key] 
                    } 
                }  else {
                    form.id && delete form.id
                }
                 //编辑数据初始化赋值
  
            }
 
            /**
             * 关闭弹窗
             */ 
            const close = () => {   
                dialog_info_flag.value = false;
                //emit("updata:flag", false)
                //console.log(props.flag)
                emit('close', false);
                resetForm() 
            }
            
            /**
             * 重置表单
            */
            const resetForm = () => {  
                form.bookname = '',
                form.author = '',
                form.isbn = '',
                form.press = '',
                form.callNumber = '',
                form.number =  ''
            }

            //提交
            const submit = (formName) =>{ 


              
                    //深拷贝  JSON.stringify(from)
                    //浅拷贝 Object.assign({}, form)  
                    let requestData = Object.assign({}, form)
                    
                    
                    /**
                     * 数据引用类型
                     * 一条线上的东西
                    */
                    //添加状态，需要密码，并且加密
                    //编辑状态，只存在，需要密码，并且加密 ，否在删除密码
                    if(requestData.id){ 
                        if(!requestData.password){
                             delete requestData.password
                        } else {
                            requestData.password = sha1(requestData.password)
                        } 
                        user_edit(requestData)
                    }else{
                        reader_add(requestData)  
                    }
 
                 
            }
            //添加用户
            const reader_add = (requestData) => {
                AddReader(requestData).then(response => {
                    let responseData = response.data
                    root.$message({
                        message: responseData.message,
                        type: "success"
                    })
                    close()
                
                }) 
            }
            //编辑用户
            const user_edit = (requestData) => {
                
            }
            return {
                // ref
                dialog_info_flag,
                formLabelWidth,
                submit_login,
                // reactive 
                form,
                // 函数
                close,
                openDialog,
                submit,
                resetForm, 
                
            }
        },
         
         
    }
</script>
<style scoped lang="scss">

</style>