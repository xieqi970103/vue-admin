<template>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="600px" @opened="openDialog">
        <el-form :model="form" ref="addInfoForm"  >
            <el-form-item label="公告内容：" :label-width="formLabelWidth" prop="username">
                <el-input   v-model="form.Info" 
                            placeholder="请输入公告信息" 
                            size="medium"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 6}"
                            ></el-input>
            </el-form-item> 
            <div class="black-space-10"></div>
             
        </el-form>
       
       
       
       <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="danger" @click="submit('addInfoForm')" :loading="submit_login">发 布</el-button>
      </div>
      </el-dialog>
</template>
<script>  
    import { computed, reactive, ref, refs, onMounted, watchEffect, onBeforeMount} from '@vue/composition-api'
    import { AddInfo } from '@/api/announcement.js'
    import { stripscript, validateEmail } from '@/utils/validate'
    //组件
    import CityPicker from '@c/CityPicker'
    //中央事件
    import Bus from "@/utils/bus"

    import store from "@/store/index"
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

            const username = computed(() => {
                return root.$store.state.app.username
            })
            const form = reactive({
                Info: "" ,
                admin: username
                 
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
                form.Info = ''
                 
            }

            //提交
            const submit = (formName) =>{  
                //深拷贝  JSON.stringify(from)
                //浅拷贝 Object.assign({}, form)  
                let requestData = Object.assign({}, form) 
                info_add(requestData)  
            }
            //发布公告
            const info_add = (requestData) => {
                AddInfo(requestData).then(response => {
                    let responseData = response.data
                    root.$message({
                        message: responseData.message,
                        type: "success"
                    })
                    close()
                
                }) 
            } 
            return {
                // ref
                dialog_info_flag,
                formLabelWidth,
                submit_login,
                username,
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