<template>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="600px" @opened="openDialog">
        <el-form :model="form" ref="addInfoForm" :rules="data.rules" >
            <el-form-item label="用户名：" :label-width="formLabelWidth" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名" size="medium"></el-input>
            </el-form-item>
            <div class="black-space-10"></div>
            
            <el-form-item label="密码：" :label-width="formLabelWidth"  prop="password">
                <el-input v-model="form.password" placeholder="请输入6-20位数字+字母" size="medium"></el-input>
            </el-form-item>
            <div class="black-space-10"></div>

            <el-form-item label="姓名：" :label-width="formLabelWidth"  prop="truename">
                <el-input v-model="form.truename"  placeholder="请输入真是姓名" size="medium"></el-input>
            </el-form-item>
            <div class="black-space-10"></div>

             

            <el-form-item label="手机号：" :label-width="formLabelWidth" prop="phone">
                <el-input v-model.number="form.phone" placeholder="请输入手机号" size="medium"></el-input>
            </el-form-item>
            <div class="black-space-10"></div>

            <el-form-item label="地区：" :label-width="formLabelWidth" prop="region">
                 <!-- <CityPicker :cityPickerLevel="['province', 'city', 'area', ]" :cityPickerData.sync="data.cityPickerData"></CityPicker>  -->
                 <CityPicker :cityPickerData.sync="data.cityPickerData"></CityPicker>
            </el-form-item>
            

            <el-form-item label="是否启用：" :label-width="formLabelWidth" prop="statys">
                <template>
                    <el-radio v-model="form.status" label="1">禁用</el-radio>
                    <el-radio v-model="form.status" label="2">启用</el-radio>
                  </template>
            </el-form-item>
           

            <el-form-item label="角色：" :label-width="formLabelWidth" prop="role">
                <el-checkbox-group v-model="form.role">
                    <el-checkbox v-for="item in data.roleItem" :key="item.role" :label="item.role">{{ item.name }}</el-checkbox>
                  </el-checkbox-group>
            </el-form-item>
             
             <el-form-item label="按钮：" :label-width="formLabelWidth"  >
                <template v-if="data.btnPerm.length > 0">
                    <div v-for="item in data.btnPerm">
                        <h4> {{ item.name }}</h4> 
                        <template v-if="item.perm && item.perm.length > 0">
                            <el-checkbox-group v-model="form.btnPerm">
                                 <el-checkbox v-for="btn in item.perm" :key="btn.value" :label="btn.value">{{ btn.name }}</el-checkbox>  
                            </el-checkbox-group> 
                        </template> 
                    </div>
                </template>
                
                 
            </el-form-item>  
            
            
        </el-form>
       
       
       
       <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="danger" @click="submit('addInfoForm')" :loading="submit_login">确 定</el-button>
      </div>
      </el-dialog>
</template>
<script>
    import sha1 from 'js-sha1' //加密
    import { reactive, ref, refs, onMounted, watchEffect, onBeforeMount} from '@vue/composition-api'
    import { GetPermButton, GetRole, GetSystem, UserAdd, UserEdit } from '@/api/user.js'
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
            //验证用户名
            let validateUsername = (rule, value, callback) => {  
                if (value === '') {
                   callback(new Error('请输入账户'));
                } else if(validateEmail(value)) {
                   callback(new Error('用户名格式有误')); 
                } else {
                   callback();
                }
            };
            //验证密码
            let validatePassword = (rule, value, callback) => {
                /**
                 * 业务逻辑
                 * 1.编辑状态：
                 *      需要校验：form.id存在并且，密码不为空
                 *      不需要校验： form.id存在，密码为空
                 * 2.添加状态：
                 *      需要校验：form.id不存在
                */
                if(form.id && !value){
                    callback();
                }
                if((form.id && value) || !form.id){
                    form.password = stripscript(value)
                    value = form.password 
                    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
                    if (value === '') {
                    callback(new Error('请输入密码'));
                    } else if (!reg.test(value)) {
                    callback(new Error('密码为6到20位的数字+字母'));
                    } else {
                    callback();
                    }
                }
                
                
            };
             
            const dialog_info_flag = ref(false) //弹窗标记
            const formLabelWidth = ref('100px')
            const submit_login = ref(false)

            const data = reactive({
                //是否启用状态
                roleStatus: '1',
                //角色
                roleCode: [],
                //角色选择
                roleItem: {},
                //按钮权限
                btnPerm: [],
                cityPickerData: {},

                 //表单的验证
                rules :  {
                    username: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: '请选择角色', trigger: 'blur' }
                    ] 
                }
            })
            const form = reactive({
                username: "",
                truename: "",
                password: "",
                phone: "",
                region: {},
                status: "2",
                role: [],
                btnPerm: []
                 
            })
             // watch
            watchEffect(() => {
                dialog_info_flag.value = props.flag
            })  
            /**
             * 请求角色
            */
            const getRole = () => {
                GetRole().then(response => {
                    data.roleItem = response.data.data
                })
                GetPermButton().then(response => {
                    data.btnPerm = response.data.data 
                })
            }
             
            // 函数

            /**
             * 弹窗打开，动画结束时
            */
            const openDialog = () => {
                // 角色请求
                getRole()
                // 初始值处理
                let editData = props.editData            
                if(editData.id){ //编辑 
                    editData.role = editData.role ? editData.role.split(',') : []
                    editData.btnPerm = editData.btnPerm ? editData.btnPerm.split(',') : []
                    for(let key in editData){
                        form[key] =  editData[key] 
                    }
                    //编辑数据初始化赋值
                    // form.username = editData.username
                    // form.truename = editData.truename
                    // form.phone = editData.phone
                    // form.status = editData.status   
                    // form.role = editData.role
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
                data.cityPickerData = {}
                //refs.addInfoForm.resetFields()
                 
                form.username = '',
                form.truename = '',
                form.password = '',
                form.phone = '',
                form.region = {},
                form.status = '2',
                form.role = [],
                form.btnPerm = []
            }

            //提交
            const submit = (formName) =>{ 

                refs[formName].validate((valid) => {
                //表单验证通过
                if (valid) {
                    //深拷贝  JSON.stringify(from)
                    //浅拷贝 Object.assign({}, form)  
                    let requestData = Object.assign({}, form)
                    
                    requestData.role =  requestData.role.join(",") //数组转成字符串，默认以,号隔开
                    requestData.btnPerm =  requestData.btnPerm.join(",") //数组转成字符串，默认以,号隔开
                    requestData.region = JSON.stringify(data.cityPickerData)
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
   
                        if(requestData.region.length <= 2){
                            requestData.region = props.editData.region
                        }

                        user_edit(requestData)
                    }else{
                        requestData.password = sha1(requestData.password)
                        user_add(requestData)
                    }


                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });

                return false



 
                 
            }
            //添加用户
            const user_add = (requestData) => {
                UserAdd(requestData).then(response => {
                        let responseData = response.data 
                        root.$message({
                            message: responseData.message,
                            type: "success"
                        })
                        //Bus.$emit('getTarget', '');
                        emit('refreshTableData');
                        close()
                    })
            }
            //编辑用户
            const user_edit = (requestData) => {
                UserEdit(requestData).then(response => {
                        let responseData = response.data
                        root.$message({
                            message: responseData.message,
                            type: "success"
                        })
                        //Bus.$emit('getTarget', '');
                        emit('refreshTableData');
                        close()
                    })
            }
            return {
                // ref
                dialog_info_flag,
                formLabelWidth,
                submit_login,
                // reactive
                data,
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