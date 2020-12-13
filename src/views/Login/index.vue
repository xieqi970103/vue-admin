<template>
    <div id="login">
        <div class="wrap">
            <div class="login-wrap">
            <ul class="menu-tab">
            <li :class="{'current': item.current }" v-for="item in menuTab" v-bind:key="item.id" @click="toggleMneu(item)">{{ item.txt }}</li>
            </ul>
            <!--表单 start-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form"   size="medium">
                <el-form-item   prop="username" class="item-from">
                    <label for="username">账户</label>
                    <el-input prefix-icon="el-icon-user-solid" id="username" type="text" v-model="ruleForm.username" autocomplete="off" width="80%"></el-input>
                </el-form-item> 
                <el-form-item    prop="password" class="item-from">
                    <label>密码</label>
                    <el-input  prefix-icon="el-icon-lock" type="password" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6"></el-input>
                </el-form-item>
                <el-form-item   prop="passwords" class="item-from" v-show="model === 'register'">
                    <label>重复密码</label>
                    <el-input prefix-icon="el-icon-lock"  type="password" v-model="ruleForm.passwords" autocomplete="off" maxlength="20" minlength="6"></el-input>
                </el-form-item>
                <el-form-item   prop="code" class="item-from">
                    <label>验证码 </label>
                    <el-row :gutter="10">
                    <el-col :span="15">
                    <el-input prefix-icon="console" type="text" v-model="ruleForm.code" maxlength="6" minlength="6"></el-input>
                    </el-col>
                    <el-col :span="9">
                    <el-button type="success" class="block" @click="getSms()" :disabled="codeButtonStatus.status">{{ codeButtonStatus.text }}</el-button>
                    </el-col>
                </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('loginForm')" :disabled = loginButtonStatus class="login-btn block">{{ model == "login" ? "登录" : "注册" }}</el-button>
                </el-form-item>
            </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import sha1 from 'js-sha1'
    import { GetSms, Regiser, Login } from '@/api/login.js'
    import { reactive, ref, onMounted } from '@vue/composition-api'
    import { stripscript, validateEmail } from '@/utils/validate'
    export default {
        name: 'login',
       // setup(props, context){
            /**
             * attrs: (...) == this.$attrs
             * emit: (...) == this.$emit
             * listeners: (...) == this.$listeners
             * parent: (...) == this.$parent
             * refs: (...) == this.$refs
             * root: (...) == this
             */

         setup(props,  { refs, root }){
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
                
              
                ruleForm.password = stripscript(value)
                value = ruleForm.password 
                let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
                if (value === '') {
                callback(new Error('请输入密码'));
                } else if (!reg.test(value)) {
                 callback(new Error('密码为6到20位的数字+字母'));
                } else {
                callback();
                }
            };
            //验证重复密码
            let validatePasswords = (rule, value, callback) => {
                
                if(model.value == 'login'){
                callback();
                }
                ruleForm.passwords = stripscript(value)
                value = ruleForm.passwords 
                let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value != ruleForm.password) {
                 callback(new Error('密码不一致'));
                } else {
                callback();
                }
            };
            //验证验证码
            let validateCode  = (rule, value, callback) => {
                let reg = /^[a-z0-9]{6}$/;
                ruleForm.code = stripscript(value)
                value = ruleForm.code 
                if (value === '') {
                return callback(new Error('请输入验证码'));
                }else if(!reg.test(value)){
                callback(new Error('验证码格式不正确'));
                }else{
                callback();
                }
            };




            /*******************************************************************************************************
             * 声明数据
             */
            //这里放置data数据、生命周期、自定义函数
            const  menuTab = reactive ([
                { txt: "登录", current: true , type: 'login' },
                { txt: "注册", current: false , type: 'register' }
            ])
            //模块值
            const model = ref('login')
            //登录按钮禁用状态
            const loginButtonStatus = ref(true)
            //验证码按钮状态
            const codeButtonStatus = reactive({
                status: false,
                text: '获取验证码'
            })
            //倒计时
            const timer = ref(null);
            //表单绑定数据
            const ruleForm = reactive({
                username: '',
                password: '',
                passwords: '',
                code: ''
            })
            //表单的验证
            const rules = reactive ({
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                passwords: [
                    { validator: validatePasswords, trigger: 'blur' }
                ],
                code: [
                    { validator: validateCode, trigger: 'blur' }
                ]
            })
            
            /************************************************************************************************ 
             * 声明函数
             */
            //切换模块
            const toggleMneu = (data => {
                menuTab.forEach(elem => {
                    elem.current = false
                });
                //高光
                data.current = true
                //修改模块值
                model.value = data.type
                resetFromData()
                cleanCountDown()
            })
            //清除表单数据
            const resetFromData = (() => {
                //重置表单
                refs['loginForm'].resetFields();
            }) 
            /**
             * 获取验证码
             */
            const getSms = (() => {
                //进行提示
                if(ruleForm.username == ''){
                    root.$message.error('邮箱不能为空');
                    return false
                }
                if(validateEmail(ruleForm.username)){
                    root.$message.error('邮箱格式有误，请重新输入！！');
                    return false
                }               
                //获取验证码
                let requestData = {
                    username: ruleForm.username,
                    model: model.value
                }
                //修改获取验证码按钮状态
                codeButtonStatus.status = true,
                codeButtonStatus.text = '发送中'

                setTimeout(() => { 
                    GetSms(requestData).then(response => {
                      
                        let data = response.data
                        root.$message({
                            message: data.message,
                            type: "success"
                        })
                        //启用登录或注册按钮
                        loginButtonStatus.value = false
                        //调用定时器,倒计时
                        countDown(60)
                    }).catch(error =>{
                         
                    })
                },1000)
            })
            /**
             * 提交表单
             */
            const submitForm = (formName => { 
                refs[formName].validate((valid) => {
                //表单验证通过
                if (valid) {
                    if(model.value === 'login'){
                        login()
                    } else { 
                        register()
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            }) 
            /**
             * 登录
             */
            const login = (() => {
                let logData = {
                    username: ruleForm.username,
                    password: sha1(ruleForm.password),
                    code: ruleForm.code,
                    model: 'login'
                }
                root.$store.dispatch('app/login', logData).then(response => {
                        console.log('登陆成功')
                        root.$router.push({
                        name: 'Console'
                    })
                }).catch(err =>{
                    console.log('err')
                })
               /* Login(logData).then(response => {
                        console.log('登陆成功')
                        root.$router.push({
                        name: 'Console'
                    })
                }).catch(err =>{

                })*/
            })
            /**
             * 注册
             */
            const register = (() => {
                let requestdata = {
                    username: ruleForm.username,
                    password: sha1(ruleForm.password),
                    code: ruleForm.code,
                    model: 'register'
                } 
                //注册接口
                Regiser(requestdata).then(response => {
                    let data = response.data
                    root.$message({
                        message: data.message,
                        type: "success"
                    })
                    toggleMneu(menuTab[0])
                    cleanCountDown()
                }).catch(error =>{
                })
            })

            /**
             * 倒计时
             */
            const countDown = ((number) =>{
                //判断定时器是否存在，存在就清楚
                if(timer.value){
                    clearInterval(timer.value)
                }
                //setTimeout:clearTimeout(变量) 只执行一次
                //serInterval：clearInterval(变量) 不断执行。需要条件才会停止
                let time = number

              timer.value = setInterval(() => {
                    time--;
                    if(time === 0) {
                        clearInterval(timer.value)
                        codeButtonStatus.status = false,
                        codeButtonStatus.text = '再次获取'
                    } else {
                        codeButtonStatus.text = `倒计时${time}秒` //ES6写发
                    }
                 
                },1000)
            })
            /**
             * 清除倒计时
             */
            const cleanCountDown = (() => {
                //还原验证码默认状态
                clearInterval(timer.value),
                codeButtonStatus.status = false,
                codeButtonStatus.text = '获取验证码'
            })


            /*
             *生命周期
             */
            //挂载完成后
            onMounted(() => {
               
            })

            return {
                menuTab,
                model,
                loginButtonStatus,
                codeButtonStatus,
                ruleForm,
                rules,
                toggleMneu,
                resetFromData,
                submitForm,
                countDown,
                getSms
            }
        },
    }
</script>
<style lang="scss" scoped>
#login {
    height: 90vh;
    background-color:#082542; 
    padding-top: 10vh;
}
.login-wrap {
     
    
    margin: auto;
 
}
.wrap {
     
    padding: 20px;
    background-color: #fff;
    width: 350px;
    margin: auto;
    border-radius: 6px;
}
.menu-tab {
  
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px; 
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0,0,0,.1);
  }
}
.login-form{
    margin-top: 29px;
    label {      
        display: block; 
        margin-bottom: 3px;
        font-size: 14px; 
    }
    .item-from {
        margin-bottom: 13px;
    }
    .block {
        display: block;
        width: 100%;
    }
    .login-btn {
    margin-top: 19px;
    }
}
</style>