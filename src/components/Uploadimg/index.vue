<template>
    <el-upload
        class="avatar-uploader"
        :action="config.action"
        :data="data.uploadKey"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatSarUpload">
        <img v-if="data.image" :src="data.image" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload> 
</template>
<script >
import { reactive, ref, onMounted, watch } from '@vue/composition-api'
import { QiniuToKen } from "@/api/common.js"
export default {
    /**
     * 组件的过程要做什么事情 （七牛云的token,显示默认图片，选择图片后渲染自身图片）
     * 最终结果要做什么 （返回选择后的图片路径）
     */
    name:"uploadImg",
    props: {
        imgUrl: {
            type: String,
            default: ""
        },
        config: {
            type: Object,
            default: () => {}
        }
    },
    setup(props, { root, emit }) { 
        const data = reactive({
            image: '',
            uploadKey: {
                token: "",
                key: ""
            }
        })
        
        
        /**
         * 图片
         */
        const handleAvatarSuccess = (res, file) => {
            let image = root.$store.getters["common/qiniuUrl"] + res.key
            data.image = image
            emit("update:imgUrl", image)
        }
        const beforeAvatSarUpload = (file) => {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            root.$message.error('上传头像图片只能是 JPG 格式!');
            } 
            if (!isLt2M) {
            root.$message.error('上传头像图片大小不能超过 2MB!');
            }

            //文件名转码
            let suffix = file.name
            let key = encodeURI(`${suffix}`)
            data.uploadKey.key = key 
            return isJPG && isLt2M;
        }
        /**
         * 获取七牛云token
         */
        const getQiniuToKen = () => {
            let requestData = {
                accesskey : props.config.accesskey,
                secretkey : props.config.secretkey,
                buckety : props.config.buckety
            }
            QiniuToKen(requestData).then(response => {
                data.uploadKey.token = response.data.data.token
                
            })
        }
        /**
         * 监听
         */ 
        watch(() => props.imgUrl, (value) =>{
            data.image = value
        })
        onMounted(() => { 
            getQiniuToKen()
        })

        return {
            data,
            handleAvatarSuccess,
            beforeAvatSarUpload,
            getQiniuToKen
        }
    }
}
</script>
<style lang="scss" scoped>

</style>