import axios from 'axios'
import { Message } from 'element-ui';
import { getToKen, getUserName } from '@/utils/app'

// 创建axios，赋给变量service
// API地址 http://www.web-jshtml.cn/productapi
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
const service  = axios.create({
    baseURL: BASEURL,
    timeout: 15000,
});

/**
 * 请求接口前，返回数据进行拦截（请求拦截器）
 */
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers['Tokey'] = getToKen()
    config.headers['UserName'] = getUserName()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

/**
 * 请求接口后，返回数据进行拦截（响应拦截器）
 */
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data 
    if(data.resCode != 0 ){
        Message.error(data.message);
        return Promise.reject(data);
    } else {
        return response;
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});



 

 


export default service; 
/**
 * 使用export default时，但不能同时存在多个default
 * 文件 import 不需要{}
 */