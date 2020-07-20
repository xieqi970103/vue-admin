<template>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="580px" @open="openDialog">
        <el-form :model="form" ref="addInfoForm">
            <el-form-item label="类别" :label-width="formLabelWidth">
                <el-select v-model="form.category" placeholder="请选择">
                        <el-option
                            v-for="item in categoryOption.item"
                            :key="item.id"
                            :label="item.category_name"
                            :value="item.id"
                            >
                        </el-option>
                </el-select>
              </el-form-item>
            
            <el-form-item label="标题" :label-width="formLabelWidth">
              <el-input v-model="form.title" placeholder="请输入内容"></el-input>
            </el-form-item>
            
            <el-form-item label="概况"  :label-width="formLabelWidth">
                <el-input v-model="form.content" type="textarea"   placeholder="请输入内容"></el-input>
              </el-form-item>
        </el-form>
       
       
       
       <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="danger" @click="submit" :loading="submit_login">确 定</el-button>
      </div>
      </el-dialog>
</template>
<script>
    import { reactive, ref, onMounted, watchEffect} from '@vue/composition-api'
    import { AddInfo } from '@/api/news.js'
    export default {
        name: 'dialogInfo',
        // 单向数据流，父级 -> 子级 不能反向修改
        props: {
            flag: {
                type: Boolean,
                default: false
            },
            category: {
                type: Array,
                dafault: () => {[]}
            }
        },
        setup(props, { root, emit, refs }){
            const dialog_info_flag = ref(false)
            const formLabelWidth = ref('70px')
            const submit_login = ref(false)
            const form = reactive({
                category: '',
                title: '',
                content: ''
            })
            const categoryOption = reactive({
                item:[]
            })
        // watch
        watchEffect(() => {
            dialog_info_flag.value = props.flag
        })    
        // 函数
        const close = () => {
            dialog_info_flag.value = false;
            //emit("updata:flag", false)
            //console.log(props.flag)
            emit('close', false);
            resetForm()
        }
        const openDialog = () => {
            categoryOption.item = props.category
        }

        const resetForm = () => {
            form.category = '',
            form.title = '',
            form.content = ''
        }

        //提交
        const submit = () =>{
            //dialog_info_flag.value= false
            let requestData = {
                categoryId: form.category,
                title: form.title,
                imgUrl: '',
                createDate: '',
                content: form.content
            }
            if(!requestData.categoryId){
                root.$message({
                     message: '标题、类型不能为空！！',
                     type: 'error'
                 })
                 return
            }
            submit_login.value = true
            AddInfo( requestData ).then(response  =>{
                 root.$message({
                     message: response.data.message,
                     type: 'success'
                 })
                submit_login.value = false
                //重置表单
                resetForm()
            }).catch(err => {
                submit_login.value = false
            }) 
        }
        return {
            // ref
            dialog_info_flag,
            formLabelWidth,
            submit_login,
            // reactive
            form,
            categoryOption,
            // 函数
            close,
            openDialog,
            submit,
            resetForm
            
        }
        },
         
         
    }
</script>
<style scoped lang="scss">

</style>