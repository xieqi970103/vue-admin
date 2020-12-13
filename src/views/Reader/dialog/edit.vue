<template>
    <el-dialog title="修改" :visible.sync="dialog_info_flag" @close="close" width="580px" @open="openDialog">
        <el-form :model="data.form" ref="addInfoForm">
            <el-form-item label="类别" :label-width="formLabelWidth">
                <el-select v-model="data.form.category" placeholder="请选择">
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
              <el-input v-model="data.form.title" placeholder="请输入内容"></el-input>
            </el-form-item>
            
            <el-form-item label="概况"  :label-width="formLabelWidth">
                <el-input v-model="data.form.content" type="textarea"   placeholder="请输入内容"></el-input>
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
    import { AddInfo, GetList, EditInfo } from '@/api/news.js'
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
            },
            id: {
                type: String,
                default: ''
            }
        },
        setup(props, { root, emit, refs }){
            const dialog_info_flag = ref(false)
            const formLabelWidth = ref('70px')
            const submit_login = ref(false)
            const data = reactive({
                form: {
                    category: '',
                    title: '',
                    content: ''
                }
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
            getInfo()
        }
        const getInfo = () => {
            let requestData = {
                pageNumber: 1,
                pageSize: 1,
                id: props.id
            }
            GetList(requestData).then(response => {
                let requestData = response.data.data.data[0]
                data.form = {
                     category: requestData.categoryId,
                     title: requestData.title,
                     content: requestData.content
                 }
            })
        }
        const resetForm = () => {
            data.form.category = '',
            data.form.title = '',
            data.form.content = ''
        }

        //提交
        const submit = () =>{
            //dialog_info_flag.value= false
            let requestData = {
                id: props.id,
                categoryId: data.form.category,
                title: data.form.title,
                imgUrl: '',
                createDate: '',
                content: data.form.content
            }
            if(!requestData.categoryId){
                root.$message({
                     message: '标题、类型不能为空！！',
                     type: 'error'
                 })
                 return
            }
            submit_login.value = true
            EditInfo( requestData ).then(response  =>{
                 root.$message({
                     message: response.data.message,
                     type: 'success'
                 })
                submit_login.value = false
                //重置表单
                emit("getList");
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
            data,
            categoryOption,
            // 函数
            close,
            openDialog,
            submit,
            resetForm,
            getInfo
            
        }
        },
         
         
    }
</script>
<style scoped lang="scss">

</style>