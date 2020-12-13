<template>
     
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="信息分类:">             
                <el-select v-model="form.categoryId" placeholder="请选择" size="small" style="width: 150px;">
                    <el-option
                        v-for="item in data.category"
                        :key="item.id"
                        :label="item.category_name"
                        :value="item.id"
                        >
                    </el-option>
                </el-select>            
            </el-form-item>
             
            <el-form-item label="新闻标题:">             
                <el-input v-model="form.title" placeholder="" style="width: 400px;" size="small"></el-input>       
            </el-form-item>

            <el-form-item label="缩略图:">             
                <UploadImg :imgUrl.sync="form.imgUrl" :config="uploadImgConfig"></UploadImg>
            </el-form-item>

            <el-form-item label="发布日期:">             
                <el-date-picker v-model="form.createDate"   type="date" placeholder="选择日期" size="small" disabled></el-date-picker>       
            </el-form-item>

            <el-form-item label="详细内容:">             
                 <quillEditor v-model="form.content" ref="myQuillEdit" :options="data.editorOption"></quillEditor>      
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="small" @click="submit" :loading="data.submit_login">保存</el-button>
              <el-button  size="small">取消</el-button>
            </el-form-item>
        </el-form>
    
</template>
<script>
import { reactive, ref, onMounted, watch } from '@vue/composition-api'
import { AddInfo, GetList, EditInfo } from '@/api/news.js'
import { timestampToTime }  from "@/utils/common"
import { QiniuToKen } from "@/api/common.js"
//组件
import UploadImg from "@c/Uploadimg"
//富文本
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
    name: "infoDetailed",
    components: { quillEditor, UploadImg }, //声明组件
    setup(props,  { root }) {
        const form = reactive({
            categoryId: '',
            title: '',
            createDate: '',
            content: '',
            imgUrl: '',

        });
        const data = reactive({
            category: [],
            id: root.$route.params.id || root.$store.getters["infoDetailed/infoId"]  ,
            editorOption: {},
            submit_login: false
            
        })
        // 图片上传配置
        const uploadImgConfig = reactive({
            action: "http://up-z2.qiniup.com",
            accesskey : "MxT0HZGTZR1Eij7mKmHgLZnxnBIx06jwa-MLjs83",
            secretkey : "X4BWueTfOd7858ZpD84o5QyvZ_sdvTZE8krNWn5Z",
            buckety : "xieqi97",
        })
         /**
          * 获取信息分类 
          */
        const getInfo_category = () => {    
            root.$store.dispatch('common/getInfoCategory').then(response =>{
            data.category = response.data.data.data
          }) 
        }
        /**
         * 获取当前ID信息
         */
        const getInfo = () => {
            let requestData = {
                pageNumber: 1,
                pageSize: 1,
                id: data.id
            }
            GetList(requestData).then(response => {
                let requestData = response.data.data.data[0] 
                
                form.categoryId = requestData.categoryId,
                form.title = requestData.title, 
                form.createDate = timestampToTime(requestData.createDate),
                form.content = requestData.content,
                form.imgUrl = requestData.imgUrl
                 
            })
        }

        /**
         * 图片
         */
        // const handleAvatarSuccess = (res, file) => {
        //     form.imgUrl = root.$store.getters["common/qiniuUrl"] + res.key
        // }
        // const beforeAvatarUpload = (file) => {
        //     const isJPG = file.type === 'image/jpeg';
        //     const isLt2M = file.size / 1024 / 1024 < 2;

        //     if (!isJPG) {
        //     root.$message.error('上传头像图片只能是 JPG 格式!');
        //     } 
        //     if (!isLt2M) {
        //     root.$message.error('上传头像图片大小不能超过 2MB!');
        //     }

        //     //文件名转码
        //     let suffix = file.name
        //     let key = encodeURI(`${suffix}`)
        //     data.uploadKey.key = key+"="
        //     console.log(data.uploadKey.key)
        //     return isJPG && isLt2M;
        // }



        /**
         * 保存
         */
        const submit = () =>{
            //dialog_info_flag.value= false
            let requestData = {
                id: data.id,
                categoryId: form.categoryId,
                title: form.title,
                imgUrl: form.imgUrl,
                content: form.content
            }
            if(!requestData.categoryId){
                root.$message({
                     message: '标题、类型不能为空！！',
                     type: 'error'
                 })
                 return
            }
            data.submit_login = true
            EditInfo( requestData ).then(response  =>{
                 root.$message({
                     message: response.data.message,
                     type: 'success'
                 })
                 data.submit_login = false
                
            }).catch(err => {
                data.submit_login = false
            }) 
        }


        onMounted(() => {
            getInfo_category()
            getInfo()
        })
 
        return {
            uploadImgConfig,
            data,
            form,
            //方法
            getInfo_category,
            getInfo,
            submit
        }
    }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>